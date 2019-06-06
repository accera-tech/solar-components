import { Component, Element, Event, EventEmitter, Prop, Watch } from '@stencil/core';

import { FocusBehavior, FocusableComponent } from '../../../behaviors/focus-behavior';
import { Bind } from '../../../utils/lang/bind';

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

  @Event() contentScroll: EventEmitter<{top: number, left: number}>;

  componentDidLoad() {}
  componentDidUnload() {}

  whenBlur() {
    if (this.collapsed) {
      this.collapsed = null;
    }
  }

  @Bind
  handleContentScroll(ev) {
    this.contentScroll.emit({ top: ev.target.scrollTop, left: ev.target.scrollLeft });
  }

  hostData() {
    return {
      class: {
        [`ac-layout--${this.collapsed}-collapsed`]: !!this.collapsed,
      }
    };
  }

  render() {
    return [
      <div class="ac-layout__nav-left-container" ref={elt => this.focusTarget = elt}>
        <slot name="nav-left" />
      </div>,
      <div class="ac-layout__content-container">
        <slot name="header" />

        <div class="ac-layout__content-scroll" onScroll={this.handleContentScroll}>
          <slot name="content" />
        </div>
      </div>
    ];
  }
}