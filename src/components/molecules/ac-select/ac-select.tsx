import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  State,
  Watch
} from '@stencil/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { equals } from 'ramda';
import { Bind } from '../../../utils/lang/bind';
import { OverlayBehavior, OverlayComponent } from '../../../behaviors/overlay-behavior';
import { AcInputBase } from '../../atoms/ac-input-base/ac-input-base';
import { AcPanelItem } from '../../atoms/ac-panel/ac-panel';

/**
 * Accera's full-featured select webcomponent.
 */
@Component({
  tag: 'ac-select',
  styleUrl: 'ac-select.scss',
})
export class AcSelect implements OverlayComponent {
  acInputBase: AcInputBase;
  childOptions: NodeListOf<HTMLOptionElement>;
  overlayBehavior = new OverlayBehavior(this);

  @Element() host: HTMLAcSelectElement;

  /**
   * The label text of the this input group.
   */
  @Prop() label: string;

  /**
   * The value of the internal input.
   */
  @Prop({ mutable: true }) value = [];

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
  @Prop({ mutable: true }) options: AcPanelItem[];

  /**
   * Set the disabled mode.
   */
  @Prop() disabled: boolean;

  /**
   * Set the loading mode, showing a loading icon.
   */
  @Prop() loading: boolean;

  /**
   * Fired when the user select/deselect an option.
   */
  @Event() change: EventEmitter<any>;

  @State() isShowingPanel: boolean;
  @State() selectedText: string;

  componentDidLoad() {
    if (!this.options) {
      this.loadOptionsFromHTML();
    } else {
      this.optionsDidUpdate();
    }
  }

  whenClickOutside() {
    if (this.isShowingPanel) {
      this.togglePanel();
    }
  }

  @Watch('value')
  valueDidUpdate(newValue, oldValue) {
    if (!equals(newValue, []) && !equals(newValue, oldValue)) {
      const selectedOptions = this.getOptionsByValue(newValue);
      this.formatSelectedText(selectedOptions);
    }
  }

  @Watch('options')
  optionsDidUpdate() {
    let selectedOptions = this.options.filter(o => o.selected); // Get all selected
    if (selectedOptions.length > 0) {
      this.value = selectedOptions.map(o => o.value);
      this.formatSelectedText(selectedOptions);
    } else {
      selectedOptions = this.getOptionsByValue(this.value);
      this.formatSelectedText(selectedOptions);
    }
  }

  formatSelectedText(selectedOptions: AcPanelItem[]) {
    const count = selectedOptions.length;
    const total = this.options.length;

    if (count == 0) {
      this.selectedText = null;
    } else if (count > 0 && count < 3) {
      this.selectedText = selectedOptions.map(item => item.title).join(', ');
    } else if (count > 2 && count < total) {
      this.selectedText = `${count} ${this.label}`;
    } else if (count === total) {
      this.selectedText = `Todos (${count})`;
    }
  }

  private loadOptionsFromHTML() {
    this.childOptions = this.host.querySelectorAll('option');
    this.options = Array.prototype.map.call(this.childOptions, o => ({ title: o.text, value: o.value, selected: o.selected }));
  }

  @Bind
  private togglePanel() {
    this.isShowingPanel = !this.loading && !this.isShowingPanel;
  }

  @Bind
  private handleSelect({ detail }) {
    if (this.multiple) {
      this.options[detail.index].selected = !detail.item.selected; // Check the actual
      this.setSelectedStateInDOM(detail.index, !detail.item.selected); // If has options defined from DOM, update it!
    } else {
      if (!detail.item.selected) {
        this.options.map((o, index) => {
          o.selected = index == detail.index; // Check only the new selected item
          this.setSelectedStateInDOM(index, index == detail.index); // If has options defined from DOM, update it!
        });
      }
    }
    this.options = [ ...this.options ];

    this.change.emit(this.value);
    this.isShowingPanel = this.multiple;
  }

  private getOptionsByValue(values: any[]) {
    const options = [];
    if (this.options) {
      this.options.forEach(o => {
        o.selected = values.includes(o.value);
        if (o.selected) options.push(o);
      });
    }
    return options;
  }

  setSelectedStateInDOM(index: number, state: boolean) {
    if (this.childOptions && this.childOptions.length > 0) {
      this.childOptions.item(index).selected = state;
      if (state) this.childOptions.item(index).setAttribute('selected', '');
      else this.childOptions.item(index).removeAttribute('selected');
    }
  }

  render() {
    const icon = this.isShowingPanel ? faChevronUp : faChevronDown;

    return [
      <ac-input-base
        ref={acInputBase => {
          this.acInputBase = acInputBase as any;
        }}
        label={this.label}
        type='text'
        value={this.selectedText}
        onFocus={this.togglePanel}
        disabled={this.disabled}
        readonly
      >
        <slot name="item-start" slot="item-start" />
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
      this.isShowingPanel && <ac-panel class="ac-select__panel" items={this.options} onSelect={this.handleSelect} maxHeight="50vh" />
    ];
  }
}
