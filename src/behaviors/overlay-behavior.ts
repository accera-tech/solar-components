import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';

/**
 * Implements a Overlay logic in a component, providing a control for blur clicks.
 */
export class OverlayBehavior extends ComponentBehavior<OverlayComponent> {
  handleBodyClick = (ev: any) => {
    if (ev.target.closest(this.component.host.tagName.toLowerCase()) !== this.component.host
      && ev.target.dataset.toggle !== this.component.host.id) {
      this.component.whenClickOutside();
    }
  };

  attach() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  detach() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }
}

/**
 * Represents a component that implements the overlay logic.
 */
export interface OverlayComponent extends ComponentBase {
  overlayBehavior: OverlayBehavior;
  whenClickOutside: () => void;
}
