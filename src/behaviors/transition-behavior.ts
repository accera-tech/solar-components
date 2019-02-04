import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';
import { animate, wait } from '../utils/animation';
import { extendMethod } from '../utils/lang/extend-method';

/**
 * Implements hooks to control the transitions states, such as entering and leaving.
 * Useful for CSS animations. CSS classes are provided, controlled by it state:
 * - `transition--before-enter` The state before the component enters on the screen.
 * - `transition--after-enter` The state after the component enters on the screen.
 * - `transition--before-leave` The state before the component leave the screen.
 */
export class TransitionBehavior extends ComponentBehavior<TransitionComponent> {

  beforeAttach() {
    // Mokeypatch componentWillLoad.
    extendMethod(this.component, 'componentWillLoad', async componentWillLoad => {
      this.component.host.classList.add('transition--before-enter');
       await animate(this.component.host).then(wait());
      if (componentWillLoad) return componentWillLoad();
    });
  }

  async attach() {
    if (this.component.componentWillEnter) await this.component.componentWillEnter();
    this.component.host.classList.replace('transition--before-enter', 'transition--after-enter');

    // Monkeypatch native Element#remove.
    // This function will wait for transitions.
    this.component.host.remove = this.customRemoveFn.bind(this);
  }

  detach() {}

  /**
   * A custom remove teardown used to replace the native HTMLElement#remove, dispatching transitions.
   */
  async customRemoveFn() {
      // Deep animations
      const allChildrens = this.component.host.getElementsByClassName('transition--after-enter');
      await Promise.all(Array.from(allChildrens).map(child => child.remove()));

      this.component.host.classList.add('transition--before-leave');
      if (this.component.componentWillLeave) await this.component.componentWillLeave();

      await animate(this.component.host).then(wait());
      Element.prototype.remove.apply(this.component.host);
  }
}

/**
 * Represents a Component that implements the Transition Behavior in it.
 */
export interface TransitionComponent extends ComponentBase {
  /**
   * The behavior instance itself.
   */
  transitionBehavior: TransitionBehavior;

  componentWillLoad: () => Promise<void> | void;
  componentWillEnter?: () => Promise<any> | void;
  componentWillLeave?: () => Promise<any> | void;
}
