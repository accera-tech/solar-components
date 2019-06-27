import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { equals } from 'ramda';

import { createControllerPortal } from '../../../behaviors/controller-behavior/create-controller-portal';
import { FocusBehavior, FocusableComponent } from '../../../behaviors/focus-behavior';
import { Bind } from '../../../utils/lang/bind';
import { Debounced } from '../../../utils/lang/reactivity';
import { AcInputBase } from '../../atoms/ac-input-base/ac-input-base';
import { AcPanel } from '../../organisms/ac-panel/ac-panel';
import { AcPopper } from '../../portals/ac-popper/ac-popper';

/**
 * Accera's full-featured select webcomponent.
 */
@Component({
  tag: 'ac-select',
  styleUrl: 'ac-select.scss',
})
export class AcSelect implements FocusableComponent {
  private SelectPanel =
    createControllerPortal<AcPanel & AcPopper>(document.getElementsByTagName('ac-panel-controller')[0]);

  /**
   * The count of max items to render in the select list, used to calculate the size of the panel.
   */
  static readonly MAX_ITEMS_TO_RENDER = 6;

  /**
   * The height of each item to render, used to calculate the size of the panel.
   */
  static readonly ITEM_HEIGHT = 30;

  /**
   * A reference to the ac-input-base component.
   */
  acInputBase: AcInputBase;

  /**
   * A list of option elements defined as a child of the select component.
   */
  childOptions: NodeListOf<HTMLOptionElement>;

  /**
   * The instance of the FocusBehavior used to close the panel when the user clicks outside.
   */
  focusBehavior = new FocusBehavior(this);
  hasFocus: boolean;

  @Element() host: HTMLAcSelectElement;

  /**
   * The label text of the this input group.
   */
  @Prop() label: string;

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value: any[] | any;

  /**
   * The name of the internal input.
   */
  @Prop({ reflectToAttr: true }) name: string;

  /**
   * The helper text to guide the user.
   */
  @Prop() helperText: string;

  /**
   * If true, the component will handle multiple selected items.
   */
  @Prop() multiple: boolean;

  /**
   * The options that will be displayed in the panel.
   */
  @Prop({ mutable: true }) options: SelectOption[];

  /**
   * Set the disabled mode.
   */
  @Prop({ reflectToAttr: true }) disabled: boolean;

  /**
   * Set the search mode.
   */
  @Prop({ reflectToAttr: true }) searchable: boolean;

  /**
   * Set the custom empty result text.
   */
  @Prop({ reflectToAttr: true }) noResultsText: string = 'No results for';

  /**
   * Set the loading mode, showing a loading icon.
   */
  @Prop() loading: boolean;

  /**
   * Fired when the user select/deselect an option.
   */
  @Event() change: EventEmitter<any>;

  /**
   * Used to toggle the panel view.
   */
  @State() isShowingPanel: boolean;

  /**
   * The text that will be displayed on the select input based on it value.
   */
  @State() selectedText: string;

  @State() filteredOptions: SelectOption[];

  @State() filter: string;

  componentDidLoad() {
    if (!this.options) {
      this.loadOptionsFromHTML();
    } else {
      this.optionsDidUpdate();
    }
  }

  componentDidUnload() {}

  /**
   * Toggle the panel view.
   */
  whenBlur() {
    if (this.isShowingPanel) {
      this.togglePanel();
    }
  }

  @Watch('value')
  valueDidUpdate(newValue: (number | string)[] | number | string,
                 oldValue: (number | string)[] | number | string) {
    if (!equals(newValue, []) && !equals(newValue, oldValue)) {
      const selectedOptions = this.getOptionsByValue(newValue);
      this.formatSelectedText(selectedOptions);
    }
  }

  @Watch('options')
  optionsDidUpdate() {
    if (this.options) {
      let selectedOptions = this.options.filter(o => o.selected); // Get all selected
      if (selectedOptions.length > 0) {
        const value = selectedOptions.map(o => o.value);
        this.value = this.multiple ? value : value[0]; // Array to a single value for Single select
        this.formatSelectedText(selectedOptions);
      } else {
        selectedOptions = this.getOptionsByValue(this.value);
        this.formatSelectedText(selectedOptions);
      }
    }
  }

  @Watch('isShowingPanel')
  isShowingPanelDidUpdate() {
    this.hasFocus = this.isShowingPanel;
  }

  @Watch('filter')
  filterDidUpdate() {
    if (this.filter) {
      this.filteredOptions = this.options.filter(o =>
        o.title
          .toLowerCase()
          .indexOf(this.filter.toLowerCase()) > -1
      );
    } else {
      this.filteredOptions = null;
    }
  }

  /**
   * Generate the selectedText based on the selected options.
   */
  formatSelectedText(selectedOptions: SelectOption[]) {
    if (this.options) {
      const count = selectedOptions.length;
      const total = this.options.length;

      if (count === 0) {
        this.selectedText = null;
      } else if (count > 0 && count < 3) {
        this.selectedText = selectedOptions.map(item => item.title).join(', ');
      } else if (count > 2 && count < total) {
        this.selectedText = `${count} ${this.label}`;
      } else if (count === total) {
        this.selectedText = `Todos (${count})`;
      }
    }
  }

  /**
   * Load the options elements from the children HTML.
   */
  private loadOptionsFromHTML() {
    this.childOptions = this.host.querySelectorAll('option, optgroup');
    this.options = Array.prototype.map.call(this.childOptions, o =>
      ({
        title: o.tagName === 'OPTGROUP' ? o.label : o.text,
        value: o.value,
        selected: o.selected,
        separator: o.tagName === 'OPTGROUP',
        group: o.parentElement.tagName === 'OPTGROUP' ? o.parentElement.label : null
      })
    ) as SelectOption[];
  }

  /**
   * Toggle the panel.
   */
  @Bind
  private togglePanel() {
    this.isShowingPanel = !this.loading && !this.isShowingPanel;
  }

  /**
   * Open the panel.
   */
  @Bind
  private openPanel() {
    this.isShowingPanel = true;
  }

  /**
   * A listener that is dispatched when the user click on a select's option.
   */
  @Bind
  private handleSelect(item) {
    if (this.multiple) {
      const index = this.options.findIndex(o => o.value === item.value);
      this.options[index].selected = !item.selected; // Check the actual
      this.setSelectedStateInDOM(index, !item.selected); // If has options defined from DOM, update it!
    } else {
      if (!item.selected) {
        this.options.map((o, index) => {
          o.selected = o.value === item.value; // Check only the new selected item
          this.setSelectedStateInDOM(index, o.selected); // If has options defined from DOM, update it!
        });
      }
    }
    this.options = [ ...this.options ];

    this.change.emit(this.value);
    this.isShowingPanel = this.multiple;
    this.filter = null;
  }

  @Bind
  @Debounced(200)
  private async handleDebouncedKeyUp() {
    const nativeInput = await this.acInputBase.getNativeInput();
    this.filter = nativeInput.value;
  }

  /**
   * Filter the options by the actual value. Used to update the options state by an external value update.
   */
  private getOptionsByValue(values: any[] | any): SelectOption[] {
    const options = [];
    if (this.options && values) {
      if (values instanceof Array) {
        this.options.forEach(o => {
          o.selected = values.includes(o.value);
          if (o.selected) { options.push(o); }
        });
      } else {
        this.options.forEach(o => {
          o.selected = values === o.value;
          if (o.selected) { options.push(o); }
        });
      }
    }
    return options;
  }

  /**
   * Update the selected options in the options elements children.
   */
  setSelectedStateInDOM(index: number, state: boolean) {
    if (this.childOptions && this.childOptions.length > 0) {
      this.childOptions.item(index).selected = state;
      if (state) { this.childOptions.item(index).setAttribute('selected', ''); } else { this.childOptions.item(index).removeAttribute('selected'); }
    }
  }

  render() {
    const icon = this.isShowingPanel ? faChevronUp : faChevronDown;
    const SelectPanel = this.SelectPanel;
    const optionsToRender = this.filteredOptions || this.options;
    const panelId = this.name + '_panel';

    return [
      <select
        name={this.name}
        multiple={this.multiple}
        class="ac-select__native"
        data-native
      >
        <slot/>
      </select>,
      <ac-input-base
        ref={acInputBase => {
          this.acInputBase = acInputBase as any;
        }}
        label={this.label}
        type="text"
        value={this.selectedText}
        onFocus={this.openPanel}
        disabled={this.disabled}
        readonly={!this.searchable}
        onKeyUp={this.handleDebouncedKeyUp}
      >
        <slot name="item-start" slot="item-start" />
        <slot name="input-label" slot="input-label" />
        <ac-button
          slot="item-end"
          theme={this.isShowingPanel ? 'primary' : 'light'}
          fill="flat"
          disabled={this.disabled}
          loading={this.loading}
          onClick={this.togglePanel}
          icon-only
        >
          <ac-fa-icon icon={icon} size={12} />
        </ac-button>
      </ac-input-base>,
      <span class="ac-input__helper-text">
        {this.helperText}
      </span>,

      <SelectPanel class="ac-select__panel" id={panelId} popperPivot={this.host} reset={!this.isShowingPanel}>
        <slot name="item-top" slot="item-top" />
        <ul class="ac-select__list" style={{ maxHeight: AcSelect.MAX_ITEMS_TO_RENDER * AcSelect.ITEM_HEIGHT + 'px' }}>
          {optionsToRender && optionsToRender.map(item => {
            if (item.separator) { return (
              <li class="ac-select__list-separator">
                <label>{item.title}</label>
              </li>
            );
            } else { return (
              <li
                class={'ac-select__list-item ' + (item.selected ? 'ac-select__list-item--selected' : '')}
                onClick={() => this.handleSelect(item)}
              >
                {item.title}
              </li>
            );
            }
          })}
          {optionsToRender && optionsToRender.length === 0 &&
            <li class="ac-select__empty-result">{this.noResultsText} {this.filter}</li>
          }
        </ul>
        <slot name="item-bottom" slot="item-bottom" />
      </SelectPanel>
    ];
  }
}

/**
 * Defines an item of a Select.
 */
export interface SelectOption {
  /**
   * The title that will be displayed in the item
   */
  title: string;

  /**
   * The value of this item that will be handled by select listeners.
   */
  value?: any;

  /**
   * If true, this item will be displayed as a selected item.
   */
  selected?: boolean;

  /**
   * If true, style this item as a list separator.
   */
  separator?: boolean;

  /**
   * The label of the options group of this item.
   */
  group?: string;
}
