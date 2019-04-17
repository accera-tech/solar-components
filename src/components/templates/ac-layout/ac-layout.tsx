import { Component, Prop, Element, Watch } from '@stencil/core';
import { FocusBehavior, FocusableComponent } from "../../../behaviors/focus-behavior";

/**
 * Accera's layout webcomponent.
 */
@Component({
  tag: 'ac-layout',
  styleUrl: 'ac-layout.scss',
  shadow: false
})
export class AcLayout implements FocusableComponent {
  @Element() host: HTMLAcLayoutElement;

  focusBehavior = new FocusBehavior(this);
  focusTarget: HTMLElement;
  hasFocus: boolean;

  /**
   * Collapse a nav drawer.
   */
  @Prop({ mutable: true, reflectToAttr: true }) collapsed: 'nav-left';
  @Watch('collapsed')
  collapsedDidUpdate() {
    this.hasFocus = !!this.collapsed;
  }

  componentDidLoad() {}
  componentDidUnload() {}

  whenBlur() {
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
      <div class="ac-layout__nav-left-container" ref={elt => this.focusTarget = elt}>
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
