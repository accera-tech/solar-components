import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Component, Prop } from '@stencil/core';

import { Bind } from '../../../../utils/lang/bind';
import { AcFaIcon } from '../../../utils/ac-fa-icon';

@Component({
  tag: 'ac-menu-item',
  styleUrl: 'ac-menu-item.scss'
})
export class AcMenu {

  @Prop() iconOnly: boolean;

  @Prop() submenu: boolean;

  @Prop({ mutable: true }) collapsed: boolean;

  @Prop() href: string;

  hostData() {
    return {
      class: {
        'ac-menu-item--icon-only': this.iconOnly,
        'ac-menu-item--collapsed': this.collapsed
      }
    };
  }

  @Bind
  handleClick() {
    if (this.submenu) {
      this.collapsed = !this.collapsed;
    }
  }

  render() {
    return [
      <a class="ac-menu-item__native" href={this.href} onClick={this.handleClick}>
        <span class="ac-menu-item__icon-start">
          <slot name="icon-start" />
        </span>
        <span class="ac-menu-item__text">
          <slot />
        </span>
        {this.submenu && <AcFaIcon icon={faCaretDown} class="ac-menu-item__submenu-icon" size={12} />}
      </a>,
      <div class="ac-menu-item__submenu">
        <slot name="submenu" />
      </div>
    ];
  }
}
