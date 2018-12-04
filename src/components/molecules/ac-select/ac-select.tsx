import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  ComponentInterface,
  State,
  Listen
} from '@stencil/core';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Bind } from '../../../helpers';
import { AcInputBase } from '../../atoms/ac-input-base/ac-input-base';

@Component({
  tag: 'ac-select',
  styleUrl: 'ac-select.scss',
  shadow: true
})
export class AcSelect implements ComponentInterface {
  acInputBase: AcInputBase;

  @Element() host: HTMLElement;

  @State() showPanel: boolean;
  @State() selectedText: string;

  @Prop() label: string;
  @Prop({ mutable: true }) value: any;
  @Prop() helperText: string;

  @Prop({ mutable: true }) options: AcPanelOption[];

  @Event() onInput: EventEmitter<KeyboardEvent>;
  @Event() onFocus: EventEmitter<FocusEvent>;
  @Event() onBlur: EventEmitter<FocusEvent>;

  @Listen('body:click')
  checkAndClose(ev: MouseEvent) {
    // @ts-ignore
    if (ev.target.closest('ac-select') !== this.host && this.showPanel) {
      this.togglePanel();
    }
  }

  @Bind
  private handleInput(ev) {
    this.onInput.emit(ev);
    this.value = this.acInputBase.value;
  }

  @Bind
  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  @Bind
  handleSelect(option: AcPanelOption) {
    this.value = option.value;

    // @TODO: Handle Multiple.
    this.selectedText = option.title;
  }

  render() {
    const icon = this.showPanel ? faChevronUp : faChevronDown;

    return [
      <ac-input-base
        ref={acInputBase => {
          // @ts-ignore
          this.acInputBase = acInputBase;
        }}
        label={this.label}
        value={this.selectedText}
        type='text'
        onInput={this.handleInput}
        onFocus={this.onFocus.emit}
        onBlur={this.onBlur.emit}
      >
        <slot name="item-start" slot="item-start" />
        <ac-button slot="item-end" theme="primary" icon-only onClick={this.togglePanel}>
          <ac-fa-icon icon={icon} />
        </ac-button>
      </ac-input-base>,
      <span class="ac-input__helper-text">
        {this.helperText}
      </span>,

      // @TODO: Make it a component!
      this.showPanel && <ac-panel>
        <ul class="ac-panel__list">
          {this.options && this.options.map(o => (
            <li class="ac-panel__list-item" onClick={() => this.handleSelect(o)}>{o.title}</li>
          ))}
        </ul>
      </ac-panel>
    ];
  }
}

export interface AcPanelOption {
  title: string;
  value: any;
}
