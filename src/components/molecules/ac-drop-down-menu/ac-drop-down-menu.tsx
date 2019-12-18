import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { isNil } from 'ramda';

import { createControllerPortal } from '../../../behaviors/controller-behavior/create-controller-portal';
import { FocusBehavior } from '../../../behaviors/focus-behavior';
import { Bind } from '../../../utils/lang/bind';
import { ensureController } from '../../../utils/stencil/ensure-controller';
import { AcPanel } from '../../organisms/ac-panel/ac-panel';
import { AcPopper } from '../../portals/ac-popper/ac-popper';
import { AcFaIcon } from '../../utils/ac-fa-icon';

import { AcDropOption } from './ac-drop-option';

@Component({
  tag: 'ac-drop-down-menu',
  styleUrl: './ac-drop-down-menu.scss'
})
export class AcDropDownMenu {
  /**
   * A reference to the ac-panel.
   */
  private selectPanel: HTMLAcPanelElement;
  /**
   * Internal reference to the select panel.
   */
  private SelectPanel = createControllerPortal<AcPanel & AcPopper>(ensureController('ac-panel-controller'));
  /**
   * Reference to the component element.
   */
  @Element() host: HTMLAcDropDownMenuElement;
  /**
   * List of all options.
   */
  @Prop() options: AcDropOption[] = [];
  /**
   * Value of selected option.
   */
  @Prop({ reflectToAttr: true, mutable: true }) value: any;
  /**
   * Compact mode.
   */
  @Prop({ mutable: true }) compact: boolean;
  /**
   * Event call on option change.
   */
  @Event() selectChange: EventEmitter
  /**
   * Flag to control input focus.
   */
  hasFocus: boolean;
  /**
   * The instance of the FocusBehavior used to close the panel when the user clicks outside.
   */
  focusBehavior = new FocusBehavior(this);
  /**
   * Flag that control the panel visibility.
   */
  @State() isPanelOpen = false;

  @Watch('isPanelOpen')
  isShowingPanelDidUpdate() {
    this.hasFocus = this.isPanelOpen;
  }
  componentDidLoad() {
    if (this.options.length === 0) {
      this.options = Array.from(this.host.querySelectorAll('ac-drop-option'))
        .map((option: any) => {
          return {
          label: option.label || option.innerText.trim(),
          value: option.value,
          image: option.image
        } as AcDropOption });
      }
    if (isNil(this.value) && this.options.length > 0) {
        this.value = this.options[0].value;
    }
  }

  componentDidUnload() {
    this.isPanelOpen = false;
  }
  /**
   * Toggle the panel view.
   */
  @Bind
  whenBlur(element) {
    // If the target element is'nt a child of the panel.
    if (!this.selectPanel.contains(element)) {
      if (this.isPanelOpen) {
        this.isPanelOpen = !this.isPanelOpen;
      }
    }
  }

  @Bind
  handlePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  handleSelect(option: AcDropOption) {
    this.isPanelOpen = !this.isPanelOpen;
    this.value = option.value;
    this.selectChange.emit(option);
  }

  render() {
    const filterSelected = option => {
      if (isNil(this.value)) {
        return false;
      }
      if (isNil(option.value)) {
        return false;
      }
      return option.value.toString() === this.value.toString()
    };
    const SelectPanel = this.SelectPanel;
    return <Host class={{ 'ac-list': true }}>
      <section style={{ display: 'none' }}>
        <slot />
      </section>
      {this.options && this.options
        .filter(filterSelected)
        .map(x => (
            <ac-button
              class={{ 'ac-drop-down-menu__button': true, 'ac-drop-down-menu--compact': this.compact }}
              theme={this.isPanelOpen ? 'primary' : 'light'}
              onClick={this.handlePanel}
              fill="flat"
            >
                {x.image && <img slot="icon-start" src={x.image} />}
                <span>{x.label}</span>
                {this.options.length > 0
                  && <AcFaIcon slot="icon-end" icon={this.isPanelOpen ? faChevronUp : faChevronDown} size={12} />}
            </ac-button>
        ))}
      <SelectPanel
        ref={selectPanel => this.selectPanel = selectPanel}
        popperPivot={this.host}
        reset={!this.isPanelOpen}
        style={{ display: 'block' }}
      >
          <ul class={{ 'ac-list': true, 'ac-drop-down-menu__list--compact': this.compact }}>
            {this.options.map(option => (
              <ac-drop-option class="ac-list__item" label={option.label} onClick={() => this.handleSelect(option)}>
                {option.image && <img src={option.image} slot="image" class="ac-drop-down__image" />}
              </ac-drop-option>
            ))}
          </ul>
      </SelectPanel>
    </Host>
  }
}
