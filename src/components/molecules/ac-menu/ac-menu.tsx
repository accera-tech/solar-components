import { Component, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'ac-menu',
  styleUrl: 'ac-menu.scss'
})
export class AcMenu {
  childItems: HTMLAcMenuItemElement[];

  @Element() host: HTMLAcMenuElement;

  @Prop() iconOnly: boolean;

  @Watch('iconOnly')
  iconOnlyDidUpdate() {
    for (const menuItem of this.childItems) {
      menuItem.iconOnly = this.iconOnly;
    }
  }

  componentDidLoad() {
    this.loadItemsFromHTML();
  }

  private loadItemsFromHTML() {
    this.childItems = Array.from(this.host.querySelectorAll('ac-menu-item'));
  }

  render() {
    return (
      <slot />
    );
  }
}
