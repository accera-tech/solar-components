import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { addClass, addStyle, animate, removeClass, wait } from '../../../utils/animation';
import { Bind } from '../../../utils/lang/bind';

/**
 * Accera's full-featured tabs webcomponent.
 */
@Component({
  tag: 'ac-tabs',
  styleUrl: 'ac-tabs.scss',
})
export class AcTabs {
  @Element() host;

  bulletElt: HTMLElement;
  wrapperElt: HTMLElement;
  currentTab: HTMLAcTabElement;
  childTabs: HTMLAcTabElement[];

  /**
   * The theme color defined in the color palette. The default is primary.
   */
  @Prop() theme: string;

  @Event() change: EventEmitter<string>;

  componentDidLoad() {
    setTimeout(() => {
      this.loadTabsFromHTML();
    }, 0);
  }

  private loadTabsFromHTML() {
    this.childTabs = Array.from(this.host.querySelectorAll('ac-tab'));
    this.currentTab = this.childTabs.find( tab => tab.active);

    this.childTabs.forEach(tab =>
      tab.addEventListener('click', () => this.select(tab))
    );

    if (this.theme) this.childTabs.forEach(tab => tab.classList.add(`ac-tab--${this.theme}`));
    return this.moveBulletToCurrentTab();
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

    const bulletLeft = ((bulletBounding.left - hostBounding.left) + bulletBounding.width / 2);
    const bulletLeftWithScroll = bulletLeft + this.wrapperElt.scrollLeft;

    return animate(this.bulletElt)
      .then(addStyle({ left: bulletLeftWithScroll + 'px' }))
      .then(addClass('ac-tabs__bullet--moving'))
      .then(wait(-200))
      .then(removeClass('ac-tabs__bullet--moving'));
  }

  @Bind
  private handleWrapperScroll() {
    this.bulletElt.style.transform = `translateX(-${this.wrapperElt.scrollLeft}px)`;
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
      <span class="ac-tabs__wrapper"
            ref={wrapper => this.wrapperElt = wrapper}
            onScroll={this.handleWrapperScroll}>
        <slot />
      </span>,
      <span class="ac-tabs__bullet" ref={bullet => this.bulletElt = bullet} />
    ];
  }
}
