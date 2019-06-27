import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch } from '@stencil/core';
import { equals } from 'ramda';

import { createControllerPortal } from '../../../behaviors/controller-behavior/create-controller-portal';
import { FocusBehavior, FocusableComponent } from '../../../behaviors/focus-behavior';
import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { Debounced } from '../../../utils/lang/reactivity';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';
import { AcPanel } from '../../organisms/ac-panel/ac-panel';
import { AcPopper } from '../../portals/ac-popper/ac-popper';

/**
 * Accera's full-featured select webcomponent.
 */
@Component({
  tag: 'ac-select',
  styleUrl: 'ac-select.scss',
})
export class AcSelect implements FocusableComponent, FormFieldComponent {
  /**
   * The count of max items to render in the select list, used to calculate the size of the panel.
   */
  static readonly MAX_ITEMS_TO_RENDER = 10;

  /**
   * The height of each item to render, used to calculate the size of the panel.
   */
  static readonly ITEM_HEIGHT = 30;

  private SelectPanel =
    createControllerPortal<AcPanel & AcPopper>(document.getElementsByTagName('ac-panel-controller')[0]);

  /**
   * A reference to the ac-input-base component.
   */
  acInputBase: HTMLAcInputBaseElement;

  /**
   * The native select element.
   */
  nativeSelect: HTMLSelectElement;

  /**
   * A reference to the ac-panel.
   */
  selectPanel: HTMLAcPanelElement;

  /**
   * The instance of the FocusBehavior used to close the panel when the user clicks outside.
   */
  focusBehavior = new FocusBehavior(this);

  hasFocus: boolean;

  /**
   * Use to request a formFieldBehavior.checkValidity call.
   */
  requestCheckValidity: boolean;

  @Element() host: HTMLAcSelectElement;

  /**
   * The instance of the FormFieldBehavior.
   */
  @Prop() formFieldBehavior = new FormFieldBehavior(this);

  /**
   * The label text of the this input group.
   */
  @Prop() label: string;

  /**
   * The helper text to guide the user.
   */
  @Prop() helperText: string;

  /**
   * Set the loading mode, showing a loading icon.
   */
  @Prop() loading: boolean;

  /**
   * Set the field in the error state with a message.
   */
  @Prop({ mutable: true }) error: string | boolean;

  /**
   * The validator functions.
   */
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];

  /**
   * The validity state.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;

  /**
   * The options that will be displayed in the panel.
   */
  @Prop({ mutable: true }) options: SelectOption[];

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value: any[] | any;

  /**
   * The name of the internal input.
   */
  @Prop({ reflectToAttr: true }) name: string;

  /**
   * If true, the component will handle multiple selected items.
   */
  @Prop({ reflectToAttr: true }) multiple: boolean;

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
  @Prop({ reflectToAttr: true }) noResultsText = 'No results for';

  /**
   * The native required attribute.
   */
  @Prop({ reflectToAttr: true }) required: boolean;

  /**
   * Used to toggle the panel view.
   */
  @State() isShowingPanel: boolean;

  /**
   * The text that will be displayed on the select input based on it value.
   */
  @State() selectedText: string;

  /**
   * The filtered options based on the filter.
   */
  @State() filteredOptions: SelectOption[];

  /**
   * The filter text used to search through the options.
   */
  @State() filter: string;

  /**
   * Fired when the user select/deselect an option.
   */
  @Event() change: EventEmitter<any>;

  @Watch('value')
  valueDidUpdate(newValue: (number | string)[] | number | string,
                 oldValue: (number | string)[] | number | string) {
    if (!equals(newValue, []) && !equals(newValue, oldValue)) {
      this.formatSelectedText();
    }
  }

  @Watch('options')
  optionsDidUpdate() {
    if (this.options) {
      const selectedOptions = this.options.filter(o => o.selected); // Get all selected
      if (selectedOptions.length > 0) {
        const value = selectedOptions.map(o => o.value);
        this.value = this.multiple ? value : value[0]; // Array to a single value for Single select
      } else {
        this.value = null;
      }
    }
  }

  @Watch('isShowingPanel')
  isShowingPanelDidUpdate() {
    this.hasFocus = this.isShowingPanel;
  }

  @Watch('error')
  errorDidUpdate(error) {
    if (error) {
      this.acInputBase.classList.add('ac-input--alert');
      this.acInputBase.classList.remove('ac-input--success');
      this.formFieldBehavior.setInvalid();
    } else {
      this.acInputBase.classList.add('ac-input--success');
      this.acInputBase.classList.remove('ac-input--alert');
      this.formFieldBehavior.setValid();
    }
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

  @Method()
  async getNativeFormField() {
    return this.nativeSelect;
  }

  @Method()
  async getSelectedOptions() {
    return this.getOptionsByValue(this.value);
  }

  @Method()
  async setValue(values) {
    this.value = values;
    this.requestCheckValidity = true;

    if (values instanceof Array) {
      this.options.forEach(o => {
        o.selected = values.includes(o.value);
      });
    } else {
      this.options.forEach(o => {
        o.selected = values === o.value
      });
    }

    this.options = [ ...this.options ];
  }

  /**
   * Toggle the panel view.
   */
  whenBlur(element) {
    // If the target element is'nt a child of the panel.
    if (!this.selectPanel.contains(element)) {
      if (this.isShowingPanel) {
        this.togglePanel();
      }
      this.requestCheckValidity = true;
    }
  }

  componentDidLoad() {
    if (!this.options) {
      this.loadOptionsFromHTML();
    } else {
      this.optionsDidUpdate();
    }
  }

  componentDidUnload() {}

  componentDidUpdate() {
    // Forcing clear the value
    this.nativeSelect.value = this.value ? this.nativeSelect.value : '';

    if (this.requestCheckValidity) {
      this.formFieldBehavior.checkValidity(this.value);
      this.requestCheckValidity = false;
      this.change.emit(this.value);
    }
  }

  /**
   * Filter the options by the actual value. Used to update the options state by an external value update.
   */
  private getOptionsByValue(values: any[] | any): SelectOption[] {
    const options = [];
    if (this.options && values) {
      if (values instanceof Array) {
        this.options.forEach(o => {
          if (values.includes(o.value)) { options.push(o); }
        });
      } else {
        this.options.forEach(o => {
          if (values === o.value) { options.push(o); }
        });
      }
    }
    return options;
  }

  /**
   * Generate the selectedText based on the selected options.
   */
  private formatSelectedText() {
    const selectedOptions = this.getOptionsByValue(this.value);
    if (this.options) {
      const count = selectedOptions.length;
      const total = this.options.filter(o => !o.separator).length;

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
    const childOptions = this.host.querySelectorAll('option, optgroup');
    this.options = Array.prototype.map.call(childOptions, o =>
      ({
        title: o.tagName === 'OPTGROUP' ? o.label : o.text,
        value: o.value,
        selected: o.hasAttribute('selected') && o.selected,
        separator: o.tagName === 'OPTGROUP',
        group: o.parentElement.tagName === 'OPTGROUP' ? o.parentElement.label : null
      })
    ) as SelectOption[];
  }

  private renderNativeOptions() {
    return this.options.map(opt => {
      if (!opt.separator) {
        return (<option selected={opt.selected} value={opt.value}>{opt.title}</option>);
      }
    });
  }

  private renderOptions(options) {
    if (options.length > 0) {
      return options.map(item => {
        if (item.separator) {
          return (
            <li class="ac-select__list-separator">
              <label>{item.title}</label>
            </li>
          );
        } else {
          return (
            <li
              class={'ac-select__list-item ' + (item.selected ? 'ac-select__list-item--selected' : '')}
              onClick={() => this.handleSelect(item)}
            >
              {item.title}
            </li>
          );
        }
      });
    } else {
      return (
        <li class="ac-select__empty-result">
          {this.noResultsText} {this.filter}
        </li>
      );
    }
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
    const selectedIndex = this.options.findIndex(o => o.value === item.value);
    if (this.multiple) {
      this.options[selectedIndex].selected = !item.selected; // Check the current selected
    } else {
      if (!item.selected) {
        this.options.forEach((o, index) => {
          o.selected = index === selectedIndex; // Check only the new selected item
        });
      }
    }
    this.options = [ ...this.options ]; // Dispatch options update

    this.isShowingPanel = this.multiple; // Close only if it's a single select
    this.requestCheckValidity = true;
    this.filter = null;
  }

  @Bind
  @Debounced(200)
  private async handleDebouncedKeyUp() {
    const nativeInput = await this.acInputBase.getNativeInput();
    this.filter = nativeInput.value;
  }

  render() {
    const icon = this.isShowingPanel ? faChevronUp : faChevronDown;
    const SelectPanel = this.SelectPanel;
    const optionsToRender = this.filteredOptions || this.options;

    return [
      <div class="ac-select__phantom-dom">
        <slot/>
      </div>,
      <select
        ref={nativeSelect => this.nativeSelect = nativeSelect}
        name={this.name}
        multiple={this.multiple}
        required={this.required}
        disabled={this.disabled}
        class="ac-select__native"
        data-native
      >
        {this.options && this.renderNativeOptions()}
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

      <SelectPanel
        ref={selectPanel => this.selectPanel = selectPanel}
        class="ac-select__panel"
        popperPivot={this.host}
        reset={!this.isShowingPanel}
      >
        <slot name="item-top" slot="item-top" />
        <ul class="ac-select__list" style={{ maxHeight: AcSelect.MAX_ITEMS_TO_RENDER * AcSelect.ITEM_HEIGHT + 'px' }}>
          {optionsToRender && this.renderOptions(optionsToRender)}
        </ul>
        <slot name="item-bottom" slot="item-bottom" />
      </SelectPanel>
    ];
  }
}

/**
 * Defines an item of a Select.
 */
export interface SelectOption<T = {}> {
  /**
   * The title that will be displayed in the item
   */
  title: string;

  /**
   * The value of this item that will be handled by select listeners.
   */
  value: number | string;

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

  /**
   * A custom data
   */
  data?: T
}
