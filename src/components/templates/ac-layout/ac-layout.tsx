import { Component, Element, Event, EventEmitter, Host, Listen, Prop, Watch, h } from '@stencil/core';

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

  contentElt: HTMLElement;
  focusBehavior = new FocusBehavior(this);
  focusTarget: HTMLElement;
  hasFocus: boolean;

  /**
   * Collapse a nav drawer.
   */
  @Prop({ mutable: true, reflectToAttr: true }) collapsed: 'nav-left';
  @Event() contentScroll: EventEmitter<{ top: number, left: number }>;

  @Watch('collapsed')
  collapsedDidUpdate() {
    this.hasFocus = !!this.collapsed;
  }

  componentDidLoad() {
    this.focusTarget = this.host.querySelector('.ac-layout__nav-left-container ac-navdrawer');
  }

  componentDidUnload() {
  }

  whenBlur(element) {
    console.log(element, element.dataset);
    if (!element.dataset.navdrawer && this.collapsed) {
      this.collapsed = null;
    }
  }

  @Listen('resize', { target: 'window' })
  @Bind
  handleContentScroll() {
    this.contentScroll.emit({ top: this.contentElt.scrollTop, left: this.contentElt.scrollLeft });
  }

  render() {
    return (
      <Host
        class={{
          [`ac-layout--${this.collapsed}-collapsed`]: !!this.collapsed,
        }}
      >
        <div class="ac-layout__nav-left-container">
          <slot name="nav-left"/>
        </div>
        <div class="ac-layout__content-container">
          <slot name="header"/>

          <div
            ref={contentElt => this.contentElt = contentElt}
            class="ac-layout__content-scroll"
            onScroll={this.handleContentScroll}
          >
            <slot name="content" />
          </div>
        </div>
      </Host>
    );
  }
}
