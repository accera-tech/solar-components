import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';
import debug from 'debug/src/browser';

const log = debug('solar:OverlayBehavior');

/**
 * Implements a Overlay logic in a component, providing a control for blur clicks.
 */
export class OverlayBehavior extends ComponentBehavior<OverlayComponent> {
  /**
   * Filter all the clicks in the body and calls the `whenClickOutside` from the component if match an outside click.
   * @param ev
   */
  private handleBodyClick = (ev: any) => {
    if (ev.target.closest(this.component.host.tagName.toLowerCase()) !== this.component.host
      && ev.target.dataset.toggle !== this.component.host.id) {
      log('Clicked outside', this.component);
      this.component.whenClickOutside();
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
 * Represents a component that implements the overlay logic.
 */
export interface OverlayComponent extends ComponentBase {
  /**
   * The instance of the behavior applied in the component.
   */
  overlayBehavior: OverlayBehavior;

  /**
   * Called when the behavior detects a click outside of the component.
   */
  whenClickOutside: () => void;
}
