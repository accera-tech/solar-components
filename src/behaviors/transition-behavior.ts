import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';
import { animate, wait } from '../utils/animation';
import { extendMethod } from '../utils/lang/extend-method';

/**
 * Implements hooks to control the transitions states, such as entering and leaving.
 * Useful for CSS animations. Two CSS classes are provided, controlled by it state:
 * - `transition--entered` When the component enter will be rendered on the screen.
 * - `transition--will-leave` When the component enter will be unmounted off the screen.
 * @TODO: Rewrite the logic of transition behavior and it CSS classes.
 */
export class TransitionBehavior extends ComponentBehavior<TransitionComponent> {

  attach() {
    // Mokeypatch componentWillLoad.
    // This function NOT will wait for transitions.
    extendMethod(this.component, 'componentWillLoad', componentWillLoad => {
      this.component.host.classList.add('transition--initial');
      if (componentWillLoad) return componentWillLoad();
    });

    // Monkeypatch componentDidLoad.
    extendMethod(this.component, 'componentDidLoad', async componentDidLoad => {
      if (componentDidLoad) componentDidLoad();
      if (this.component.componentWillEnter) await this.component.componentWillEnter();

      this.component.host.classList.replace('transition--initial', 'transition--entered');

      // Monkeypatch native Element#remove.
      // This function will wait for transitions.
      this.component.host.remove = async () => {
        this.component.host.classList.add('transition--will-leave');

        if (this.component.componentWillLeave) await this.component.componentWillLeave();
        await animate(this.component.host).then(wait());
        Element.prototype.remove.apply(this.component.host);
      };
    });
  }

  detach() {}
}

/**
 * Represents a Component that implements the Transition Behavior in it.
 */
export interface TransitionComponent extends ComponentBase {
  /**
   * The behavior instance itself.
   */
  transitionBehavior: TransitionBehavior;

  componentWillEnter?: () => Promise<any> | void;
  componentWillLeave?: () => Promise<any> | void;

  _componentWillLoad?: () => Promise<any> | void;
  _componentDidLoad?: Function;
}
