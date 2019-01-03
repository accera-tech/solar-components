import { Component, Element, Event, EventEmitter, Listen, Prop } from '@stencil/core';
import { addClass, addStyle, animate, removeClass, wait } from '../../../helpers/animation';

/**
 * Accera's full-featured tabs webcomponent.
 */
@Component({
  tag: 'ac-tabs',
  styleUrl: 'ac-tabs.scss',
  shadow: true
})
export class AcTabs {
  @Element() host;

  bulletElt: HTMLElement;
  currentTab: HTMLAcTabElement;
  childTabs: HTMLAcTabElement[];

  /**
   * The theme color defined in the color palette. The default is primary.
   */
  @Prop() theme: string;

  @Event() change: EventEmitter<string>;

  componentDidLoad() {
    this.loadTabsFromHTML();
  }

  @Listen('click')
  handleClick(ev) {
    if (ev.target.tagName == 'AC-TAB') this.select(ev.target);
  }

  private loadTabsFromHTML() {
    this.childTabs = Array.from(this.host.querySelectorAll('ac-tab'));
    this.currentTab = this.childTabs.find( tab => tab.active);

    if (this.theme) this.childTabs.forEach(tab => tab.classList.add(`ac-tab--${this.theme}`));
    this.moveBulletToCurrentTab();
  }

  private async select(tab: HTMLAcTabElement) {
    if (this.currentTab.id !== tab.id) {
      this.currentTab.active = false;
      tab.active = true;
      this.currentTab = tab;
      await this.moveBulletToCurrentTab();
      this.change.emit(this.currentTab.id);
    }
  }

  private moveBulletToCurrentTab() {
    const bulletBounding = this.currentTab.getBoundingClientRect();
    const hostBounding = this.host.getBoundingClientRect();

    return animate(this.bulletElt)
      .then(addStyle({ left: ((bulletBounding.left - hostBounding.left) + bulletBounding.width / 2) + 'px' }))
      .then(addClass('ac-tabs__bullet--moving'))
      .then(wait(-200))
      .then(removeClass('ac-tabs__bullet--moving'));
  }

  hostData() {
    return {
      attribute: 'nav',
      class: {
        [`ac-tabs--${this.theme}`]: this.theme !== undefined
      }
    }
  }

  render() {
    return [
      <slot />,
      <span class="ac-tabs__bullet" ref={bullet => this.bulletElt = bullet} />
    ];
  }
}
