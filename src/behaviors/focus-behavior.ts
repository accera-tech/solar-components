import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';
import debug from 'debug/src/browser';

const log = debug('solar:FocusBehavior');

/**
 * Implements a Focus logic in a component, providing a control for blur clicks.
 */
export class FocusBehavior extends ComponentBehavior<FocusableComponent> {
  /**
   * Filter all the clicks in the body and calls the `whenBlur` from the component if match an outside click.
   * @param ev
   */
  private handleBodyClick = (ev: any) => {
    if (this.component.hasFocus) {
      const isClickingOutsideTheTarget = this.component.focusTarget ?
        ev.target.closest(this.component.focusTarget.tagName.toLowerCase()) !== this.component.focusTarget
        : ev.target.closest(this.component.host.tagName.toLowerCase()) !== this.component.host;

      if (isClickingOutsideTheTarget
        && ev.target.dataset.toggle !== this.component.host.id) {
        log('Clicked outside', this.component);
        this.component.whenBlur();
      }
    }
  };

  /**
   * Setup the event listener to the body.
   */
  attach() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  /**
   * Remove the event listener to the body.
   */
  detach() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }
}

/**
 * Represents a component that implements the focus logic.
 */
export interface FocusableComponent extends ComponentBase {
  /**
   * The instance of the behavior applied in the component.
   */
  focusBehavior: FocusBehavior;

  /**
   * Called when the behavior detects a click outside of the component.
   */
  whenBlur: () => void;

  /**
   * Used to control the focus state.
   */
  hasFocus: boolean;

  /**
   * The target to be checked. If it is null, the host field will be used.
   */
  focusTarget?: HTMLElement;
}
