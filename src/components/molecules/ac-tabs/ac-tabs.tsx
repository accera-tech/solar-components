import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

import { addStyle, animate } from '../../../utils/animation';
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

  @Prop() compact: boolean;

  @Prop({ mutable: true }) selected: string | number;

  @Event() tabChange: EventEmitter<string>;

  @Watch('selected')
  onDidSelectedUpdate() {
    // tslint:disable-next-line:triple-equals
    const tab = this.childTabs.find(tab => tab.id == this.selected);
    this.select(tab);
  }

  @Watch('compact')
  onDidCompactUpdate() {
    this.childTabs.forEach(tab => {
      tab.compact = this.compact
    });
  }

  componentDidLoad() {
    // @TODO: Change it to componentDidRender hook.
    this.loadTabsFromHTML();
  }

  componentDidUpdate() {
    this.loadTabsFromHTML();
  }
  /**
   * Load the tabs from the children.
   */
  private loadTabsFromHTML(selected ?: number | string) {
    this.childTabs = Array.from(this.host.querySelectorAll('ac-tab'));
    if (!this.currentTab) {
      this.currentTab = this.childTabs[0];
    }

    this.childTabs.forEach(tab => {
      tab.addEventListener('click', () => this.select(tab));
    });

    this.childTabs.forEach(tab => {
      tab.compact = this.compact;
      // tslint:disable-next-line:triple-equals
      if (selected && selected == tab.id) {
        tab.active = true;
      }
    });
    this.selected = this.currentTab.id;
    setTimeout(() => this.moveBulletToCurrentTab(), 100);
  }

  /**
   * Mark a tab as selected.
   */
  private async select(tab: HTMLAcTabElement) {
    if (this.currentTab.id !== tab.id) {
      this.currentTab.active = false;
      tab.active = true;
      this.currentTab = tab;
      await this.moveBulletToCurrentTab();
      this.selected = this.currentTab.id;
      this.tabChange.emit(this.currentTab.id);
    }
  }

  /**
   * Animate the bullet element to a tab on the screen.
   */
  private moveBulletToCurrentTab() {
    const bulletBounding = this.currentTab.getBoundingClientRect();
    const hostBounding = this.host.getBoundingClientRect();

    const bulletLeft = ((bulletBounding.left - hostBounding.left) + bulletBounding.width / 2);
    const bulletLeftWithScroll = bulletLeft + this.wrapperElt.scrollLeft;

    return animate(this.bulletElt)
      .then(addStyle({ left: bulletLeftWithScroll + 'px' }));
  }

  /**
   * Update the bullet element position when occurs a scroll, preventing breaks on the layout.
   */
  @Bind
  private handleWrapperScroll() {
    this.bulletElt.style.transform = `translateX(-${this.wrapperElt.scrollLeft}px)`;
  }

  render() {
    return (
      <Host
        class={{
        [`ac-tabs--${this.theme}`]: this.theme !== undefined,
        'ac-tabs--compact': this.compact
      }}
      >
      <span
        class="ac-tabs__wrapper"
        ref={wrapper => this.wrapperElt = wrapper}
        onScroll={this.handleWrapperScroll}
      >
        <slot/>
      </span>
        <span class="ac-tabs__bullet" style={{ left: '0px' }} ref={bullet => this.bulletElt = bullet}/>
      </Host>
    );
  }
}
