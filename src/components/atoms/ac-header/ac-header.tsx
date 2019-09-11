import { Component, Element, Host, Listen, Prop, State, h } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';
import { AcMenuIcon } from '../../utils/ac-menu-icon';

/**
 * Accera's header web-component.
 */
@Component({
  tag: 'ac-header',
  styleUrl: 'ac-header.scss',
  shadow: false,
})
export class AcHeader {
  private parentLayout: HTMLAcLayoutElement;

  @Element() host: HTMLAcHeaderElement;

  @Prop() theme = 'primary';

  @Prop({ reflectToAttr: true, mutable: true }) scrolled: boolean;

  @State() hasNavdrawer: boolean;

  componentDidLoad() {
    // @TODO: Use dependency injection.
    const parentLayout =
      this.host.parentElement.tagName === 'AC-LAYOUT' ?
        this.host.parentElement :
        this.host.parentElement.parentElement.tagName === 'AC-LAYOUT' ? this.host.parentElement.parentElement : null;

    if (parentLayout) {
      this.parentLayout = parentLayout as any;
      this.hasNavdrawer = !!this.parentLayout.querySelector('ac-navdrawer');
    }
  }

  @Listen('contentScroll', { target: 'window' })
  handleLayoutContentScroll(ev) {
    this.scrolled = ev.detail.top > 0;
  }

  @Bind
  handleMenuClick() {
    this.parentLayout.collapsed = 'nav-left';
  }

  render() {
    return (
      <Host
        class={{
          [`ac-header--${this.theme}`]: this.theme !== undefined,
          'ac-header--scrolled': this.scrolled
        }}
      >
        <header class="ac-header__header-container">
          {this.hasNavdrawer ?
            <ac-button
              class="ac-header__menu-button"
              shape="round"
              fill="clear"
              data-toggle="mainNavdrawer"
              icon-only
              onClick={this.handleMenuClick}
            >
              <AcMenuIcon/>
            </ac-button>
            : <span/>
          }
          <div class="ac-header__content">
            <slot/>
          </div>
          <div class="ac-header__actions">
            <slot name="actions"/>
          </div>
        </header>
        <slot name="sub-header"/>
      </Host>
    );
  }
}
