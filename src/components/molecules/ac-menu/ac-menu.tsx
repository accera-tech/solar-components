import { Component, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'ac-menu',
  styleUrl: 'ac-menu.scss'
})
export class AcMenu {
  @Element() host: HTMLAcMenuElement;
  childItems: HTMLAcMenuItemElement[];

  @Prop() iconOnly: boolean;
  @Watch('iconOnly')
  iconOnlyDidUpdate() {
    for (const menuItem of this.childItems) {
      menuItem.iconOnly = this.iconOnly;
    }
  }

  loadItemsFromHTML() {
    this.childItems = Array.from(this.host.querySelectorAll('ac-menu-item'));
  }

  componentDidLoad() {
    this.loadItemsFromHTML();
  }

  render() {
    return (
      <slot />
    );
  }
}
