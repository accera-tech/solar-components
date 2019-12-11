import { Component, Prop, h, Host, Element, State, Watch, Method, EventEmitter, Event } from '@stencil/core';

import { AsyncDataBehavior, AsyncDataComponent, AsyncMetadata } from '../../../behaviors/async-data-behavior';
import { AcOption } from '../../../utils/types/ac-option';
import { createControllerPortal } from '../../../behaviors/controller-behavior/create-controller-portal';
import { AcPanel } from '../../organisms/ac-panel/ac-panel';
import { AcPopper } from '../../portals/ac-popper/ac-popper';
import { ensureController } from '../../../utils/stencil/ensure-controller';
import { Bind } from '../../../utils/lang/bind';
import { Debounced } from '../../../utils/lang/reactivity';
import { FocusBehavior } from '../../../behaviors/focus-behavior';
import { FormFieldComponent, FormFieldBehavior } from '../../../behaviors/form-behavior';
import { ValidatorFn, CustomValidityState } from '../../../utils/validations/validations';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'ac-autocomplete',
  styleUrl: 'ac-autocomplete.scss'
})
export class AcAutocomplete implements AsyncDataComponent<AutocompleteFetchParams, AcOption[]>, FormFieldComponent {

  /**
   * A reference to the component element.
   */
  @Element() host: HTMLElement;
  /**
   * A reference to the ac-input-base component.
   */
  acInputBase: HTMLAcInputBaseElement;
  /**
   * The name of the internal input.
   */
  @Prop({ reflectToAttr: true }) name: string;
  /**
   * Set the disabled mode.
   */
  @Prop({ reflectToAttr: true }) disabled: boolean;
  /**
   * The native required attribute.
   */
  @Prop({ reflectToAttr: true }) required: boolean;
  /**
   * Set the custom empty result text.
   */
  @Prop({ reflectToAttr: true }) noResultsLabel = 'No results for';
  /**
   * Action to be call when the user start typing.
   */
  @Prop({ mutable: true }) fetch: (params: { filter: string }) => Promise<AsyncMetadata<AcOption[]>>;
  /**
   * Set the loading mode, showing a loading icon.
   */
  @Prop() loading: boolean;
  /**
   * The options that will be displayed in the panel.
   */
  @Prop({ mutable: true }) options: AcOption[] = [];
    /**
   * The validator functions.
   */
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];
  /**
   * Set the field in the error state with a message.
   */
  @Prop({ mutable: true }) error: string | boolean;
  /**
   * Select size
   */
  @Prop({ mutable: true }) size: 'small' | 'large';
  /**
   * The label text of the input.
   */
  @Prop() label: string;
  /**
   * The value of the input.
   */
  @Prop() value: any;
  /**
   * The text that will be displayed on the select input based on it value.
   */
  @State() selectedText: string;
  /**
   * The filter text used to search through the options.
   */
  @State() filter: string;

  /**
   * Flag that control the panel visibility.
   */
  @State() isPanelOpen = false;

  asyncDataBehavior: AsyncDataBehavior<AutocompleteFetchParams, AcOption[]> = new AsyncDataBehavior<AutocompleteFetchParams, AcOption[]>(this);
  /**
   * The instance of the FormFieldBehavior.
   */
  formFieldBehavior: FormFieldBehavior = new FormFieldBehavior(this);

  /**
   * Flag to control input focus.
   */
  hasFocus: boolean;
  /**
   * Use to request a formFieldBehavior.checkValidity call.
   */
  requestCheckValidity: boolean = false;
  /**
   * The validity state.
   */
  @Prop({ mutable: true }) validity: CustomValidityState;
    /**
   * Fired when the user select an option.
   */
  @Event() selectChange: EventEmitter<any>;

  private SelectPanel = createControllerPortal<AcPanel & AcPopper>(ensureController('ac-panel-controller'));
  /**
   * A reference to the ac-panel.
   */
  private selectPanel: HTMLAcPanelElement;

  /**
   * The instance of the FocusBehavior used to close the panel when the user clicks outside.
   */
  focusBehavior = new FocusBehavior(this);

  @Watch('error')
  errorDidUpdate(error) {
    if (error) {
      this.acInputBase.error = true;
      this.formFieldBehavior.setInvalid();
    } else {
      this.acInputBase.error = false;
      this.formFieldBehavior.setValid();
    }
  }

  @Method()
  async getFormFieldBehavior() {
    return this.formFieldBehavior;
  }

  @Bind
  handleSelected(option: AcOption) {
    this.selectedText = option.title;
    this.value = option.value;
    this.requestCheckValidity = true;
    this.formFieldBehavior.setDirty();
    this.filter = null;
    this.isPanelOpen = false;
  }


  @Bind
  @Debounced(200)
  private async handleDebouncedKeyUp(event) {
    const { target: { value } } = event;
    this.filter = value;
    this.asyncDataBehavior.executeFetch();
  }

  getFetchParams() {
    return { filter: this.filter };
  }


  @Watch('isPanelOpen')
  isShowingPanelDidUpdate() {
    this.hasFocus = this.isPanelOpen;
  }

  whenReceiveData(metaData: AsyncMetadata<AcOption[]>) {
    this.options = metaData.data;
    this.isPanelOpen = true;
  }

  componentDidUpdate() {
    if (this.requestCheckValidity) {
      this.formFieldBehavior.checkValidity(this.value);
      this.requestCheckValidity = false;
      this.selectChange.emit(this.value);
    }
  }
  /**
   * Toggle the panel view.
   */
  whenBlur(element) {
    // If the target element is'nt a child of the panel.
    if (!this.selectPanel.contains(element)) {
      if (this.isPanelOpen) {
        this.isPanelOpen = !this.isPanelOpen;
      }
      if (this.requestCheckValidity === false && this.isPanelOpen === false) {
        if (!this.options.some(x => x.title.toString().toUpperCase().includes(this.acInputBase.value.toUpperCase()))) {
          this.acInputBase.value = '';
        }
      }
      this.formFieldBehavior.setTouched();
    }
  }
  componentDidUnload() {
    this.isPanelOpen = false;
  }

  render() {
    const SelectPanel = this.SelectPanel;
    return <Host class="ac-autocomplete">
      <ac-input-base
            ref={acInputBase => this.acInputBase = acInputBase}
            class="ac-autocomplete__input"
            name={this.name}
            disabled={this.disabled}
            type="text"
            label={this.label}
            value={this.selectedText}
            onKeyUp={this.handleDebouncedKeyUp}
            size={this.size}
          >
            {this.loading && <AcFaIcon slot="item-end" class="ac-autocomplete__icon" icon={faSpinner} size={14} anim="spin"/>}
      </ac-input-base>
      <SelectPanel
            ref={selectPanel => this.selectPanel = selectPanel}
            class="ac-autocomplete__panel"
            popperPivot={this.host}
            reset={!this.isPanelOpen}>
          <ul class="ac-autocomplete__list ac-list">
            {this.options.length === 0
              ?  <li class="ac-list__item">
                  {this.noResultsLabel} {this.filter}
                </li>
              : this.options.map((option, index) => (
                <li
                  class="ac-list__item"
                  key={index}
                  tabIndex={index}
                  value={option.value}
                  onClick={() => this.handleSelected(option)}>
                  {option.title}
                </li>
              ))}
          </ul>
        </SelectPanel>
    </Host>;
  }
}

interface AutocompleteFetchParams {
  filter: string
}
