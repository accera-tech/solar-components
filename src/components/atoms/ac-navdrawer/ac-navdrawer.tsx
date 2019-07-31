import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Prop, Watch } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's Sidebar webcomponent.
 */
@Component({
  tag: 'ac-navdrawer',
  styleUrl: 'ac-navdrawer.scss',
  shadow: true
})
export class AcNavdrawer {
  childMenus: HTMLAcMenuElement[];

  @Element() host: HTMLAcNavdrawerElement;

  /**
   * The color theme.
   */
  @Prop() theme: string;

  /**
   * The navdrawer mode.
   */
  @Prop({ mutable: true }) compact: boolean;

  @Watch('compact')
  iconOnlyDidUpdate() {
    for (const menu of this.childMenus) {
      menu.iconOnly = this.compact;
    }
  }

  componentDidLoad() {
    this.loadItemsFromHTML();
  }

  componentDidUnload() {}

  private loadItemsFromHTML() {
    this.childMenus = Array.from(this.host.querySelectorAll('ac-menu'));
  }

  @Bind
  private toggleMode() {
    this.compact = !this.compact;
  }

  hostData() {
    return {
      attribute: 'nav',
      class: {
        [`ac-navdrawer--${this.theme}`]: !!this.theme,
        'ac-navdrawer--compact': this.compact,
      }
    };
  }

  render() {
    return [
      <div class="ac-navdrawer__header">
        <slot name="header-title" />
        <slot name="header-actions" />
      </div>,
      <nav class="ac-navdrawer__content">
        <slot name="content" />
      </nav>,
      <div class="ac-navdrawer__toggle-button" onClick={this.toggleMode}>
        <ac-fa-icon icon={this.compact ? faChevronRight : faChevronLeft} size={14} />
      </div>
    ];
  }
}
