import debug from 'debug/src/browser';

import { ComponentBase, ComponentBehavior } from '../utils/stencil/component-behavior';

const log = debug('solar:FocusBehavior');

/**
 * Implements a Focus logic in a component, providing a control for blur clicks.
 */
export class FocusBehavior extends ComponentBehavior<FocusableComponent> {

  /**
   * Check if a target node branch has a data-toggle that match the host id.
   */
  static checkBypassNode(focusElt, target) {
    let isBypassNode = false;
    if (focusElt.id) {
      const bypassNode = document.body
        .querySelector(`[data-toggle="${focusElt.id}"]`);
      isBypassNode = bypassNode ? bypassNode.contains(target) : false;
    }
    return isBypassNode;
  }

  /**
   * Filter all the clicks in the body and calls the `whenBlur` from the component if match an outside click.
   * @param ev A Click Event.
   */
  private handleBodyClick = (ev: any) => {
    if (this.component.hasFocus) {
      const focusElt = this.component.focusTarget || this.component.host;

      const isClickingOutsideTheTarget = ev.target.closest(focusElt.tagName.toLowerCase()) !== focusElt;
      if (isClickingOutsideTheTarget && !FocusBehavior.checkBypassNode(focusElt, ev.target)) {
        log('Clicked outside', focusElt);
        this.component.whenBlur(ev.target);
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
  whenBlur: (element: HTMLElement) => void;

  /**
   * Used to control the focus state.
   */
  hasFocus: boolean;

  /**
   * The target to be checked. If it is null, the host field will be used.
   */
  focusTarget?: HTMLElement;
}
