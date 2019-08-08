import { Component, Element, Listen, Prop, State } from '@stencil/core';

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

  @Prop({ reflectToAttr: true, mutable: true }) scrolled: boolean;

  @State() hasNavdrawer: boolean;

  componentDidLoad() {
    const closestLayout = this.host.parentElement.closest('ac-layout');
    if (closestLayout) {
      this.parentLayout = closestLayout as HTMLAcLayoutElement;
      this.hasNavdrawer = !!closestLayout.querySelector('ac-navdrawer');
    }
  }

  @Listen('window:contentScroll')
  handleLayoutContentScroll(ev) {
    this.scrolled = ev.detail.top > 0;
  }

  @Bind
  handleMenuClick() {
    this.parentLayout.collapsed = 'nav-left';
  }

  hostData() {
    return {
      class: {
        'ac-header--scrolled': this.scrolled,
      }
    };
  }

  render() {
    return [
      <header class="ac-header__header-container">
        { this.hasNavdrawer &&
          <ac-button
            class="ac-header__menu-button"
            expand="circle"
            fill="clear"
            data-toggle="mainNavdrawer"
            icon-only
            onClick={this.handleMenuClick}
          >
            <AcMenuIcon />
          </ac-button>
        }
        <div class="ac-header__content">
          <slot />
        </div>
        <div class="ac-header__actions">
          <slot name="actions" />
        </div>
      </header>,
      <slot name="sub-header" />
    ];
  }
}
