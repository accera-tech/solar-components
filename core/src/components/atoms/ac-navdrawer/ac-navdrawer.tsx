import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Host, Prop, Watch, h, Event, EventEmitter } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { AcNeogridShape } from '../../utils/ac-neogrid-shape';
import { TransitionComponent, TransitionBehavior } from '../../../behaviors/transition-behavior';

/**
 * Accera's Sidebar webcomponent.
 */
@Component({
  tag: 'ac-navdrawer',
  styleUrl: 'ac-navdrawer.scss',
})
export class AcNavdrawer implements TransitionComponent {
  childMenus: HTMLAcMenuElement[];
  /**
   * The instance of the transition behavior used to animate this component.
   */
  transitionBehavior = new TransitionBehavior(this);
  @Element() host: HTMLAcNavdrawerElement;

  /**
   * Show or hide toggle button
   */
  @Prop() showToggle: boolean = true;

  /**
   * Show title in the navdrawer and toggle header
   */
  @Prop() title: string;
  /**
   * The color theme.
   */
  @Prop() theme: string;

  /**
   * Compact mode.
   */
  @Prop({ mutable: true }) compact: boolean;

  @Watch('compact')
  compactDidUpdate() {
    for (const menu of this.childMenus) {
      menu.iconOnly = this.compact;
    }
  }

  componentDidLoad() {
    this.loadItemsFromHTML();
  }


  componentWillLoad() {}
  componentDidUnload() {
    this.closeEv.emit();
  }

  private loadItemsFromHTML() {
    this.childMenus = Array.from(this.host.querySelectorAll('ac-menu'));
  }

  @Bind
  private toggleMode() {
    this.compact = !this.compact;
  }

  @Bind
  private close() {
    this.host.remove();
  }

  @Event({ eventName: 'close' }) closeEv: EventEmitter<void>;


  render() {
    return (
      <Host
        class={{
          [`ac-navdrawer--${this.theme}`]: !!this.theme,
          'ac-navdrawer--compact': this.compact,
          'ac-navdrawer--over': !!this.title
        }}
      >
        <div class="ac-navdrawer__header">
        {this.title
          ? <div class="ac-navdrawer__title">
              <span class="ac-navdrawer__title-content">{this.title}</span>
              <ac-button class="ac-navdrawer__close-button" fill="clear" theme="primary" shape="round" icon-only onClick={this.close}>
                <AcFaIcon icon={faTimes}  size={14} />
              </ac-button>
            </div>
          : <slot name="header"/>}
        </div>
        <nav class="ac-navdrawer__content">
          <slot name="content"/>
        </nav>
        {this.showToggle && <div class="ac-navdrawer__toggle-button" onClick={this.toggleMode}>
          <AcNeogridShape class="ac-navdrawer__toggle-button-bg"/>
          <AcFaIcon
            class="ac-navdrawer__toggle-button-icon"
            icon={this.compact ? faChevronRight : faChevronLeft}
            size={11}
          />
        </div>}
      </Host>
    );
  }
}
