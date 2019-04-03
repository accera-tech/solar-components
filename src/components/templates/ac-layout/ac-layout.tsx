import {Component, Prop, Element} from '@stencil/core';
import {OverlayBehavior, OverlayComponent} from "../../../behaviors/overlay-behavior";

/**
 * Accera's layout webcomponent.
 */
@Component({
  tag: 'ac-layout',
  styleUrl: 'ac-layout.scss',
  shadow: false
})
export class AcLayout implements OverlayComponent {
  @Element() host: HTMLAcLayoutElement;

  overlayBehavior = new OverlayBehavior(this);
  overlayTarget: HTMLElement;

  @Prop({ mutable: true, reflectToAttr: true }) collapsed: 'nav-left';

  componentDidLoad() {}
  componentDidUnload() {}

  whenClickOutside() {
    if (this.collapsed) {
      this.collapsed = null;
    }
  }

  hostData() {
    return {
      class: {
        [`ac-layout--${this.collapsed}-collapsed`]: !!this.collapsed,
      }
    }
  }

  render() {
    return [
      <div class="ac-layout__nav-left-container" ref={elt => this.overlayTarget = elt}>
        <slot name="nav-left" />
      </div>,
      <div class="ac-layout__content-container">
        <slot name="header" />

        <div class="ac-layout__content-scroll">
          <slot name="content" />
        </div>
      </div>
    ];
  }
}
