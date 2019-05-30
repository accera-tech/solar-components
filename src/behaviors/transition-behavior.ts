import { animate, wait } from '../utils/animation';
import { extendMethod } from '../utils/lang/extend-method';
import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';

/**
 * Implements hooks to control the transitions states, such as entering and leaving.
 * Useful for CSS animations. CSS classes are provided, controlled by it state:
 * - `transition--before-enter` The state before the component enters on the screen.
 * - `transition--after-enter` The state after the component enters on the screen.
 * - `transition--before-leave` The state before the component leave the screen.
 */
export class TransitionBehavior extends ComponentBehavior<TransitionComponent> {
  removeIsQueued = false;

  /**
   * Applies a mokeypatch of componentWillLoad to add the transition hooks. Also, it dispatch the CSS transitions.
   */
  beforeAttach() {
    extendMethod(this.component, 'componentWillLoad', async componentWillLoad => {
      this.component.host.classList.add('transition--before-enter');
      await animate(this.component.host).then(wait());
      if (componentWillLoad) { return componentWillLoad(); }
    });
  }

  /**
   * Execute the componentWillEnter transition.
   * Also, it applies a mokeypatch of the native Element#remove function to add the transition hooks.
   */
  async attach() {
    if (this.component.componentWillEnter) { await this.component.componentWillEnter(); }
    this.component.host.classList.replace('transition--before-enter', 'transition--after-enter');

    // Monkeypatch native Element#remove.
    // This function will wait for transitions.
    this.component.host.remove = this.customRemoveFn.bind(this);
  }

  detach() {}

  /**
   * A custom remove teardown used to replace the native HTMLElement#remove, dispatching the CSS transitions.
   */
  async customRemoveFn() {
    if (!this.removeIsQueued) {
      this.removeIsQueued = true;

      // Deep animations
      const allChildren = this.component.host.getElementsByClassName('transition--after-enter');
      await Promise.all(Array.from(allChildren).map(child => child.remove()));

      this.component.host.classList.add('transition--before-leave');
      if (this.component.componentWillLeave) { await this.component.componentWillLeave(); }

      await animate(this.component.host).then(wait());
      Element.prototype.remove.apply(this.component.host);
    }
  }
}

/**
 * Represents a Component that implements the Transition Behavior in it.
 */
export interface TransitionComponent extends ComponentBase {
  /**
   * The behavior instance itself applied to the component.
   */
  transitionBehavior: TransitionBehavior;

  /**
   * A hook dispatched when the component loads. Supporting async operations.
   */
  componentWillLoad: () => Promise<void> | void;

  /**
   * A hook dispatched when the component appears on the screen.
   */
  componentWillEnter?: () => Promise<any> | void;

  /**
   * A hook dispatched when the component leaves the screen.
   */
  componentWillLeave?: () => Promise<any> | void;
}
