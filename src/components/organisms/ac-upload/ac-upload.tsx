import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Component, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';

@Component({
  tag: 'ac-upload',
  styleUrl: 'ac-upload.scss',
})

export class AcUpload {
  private nativeInput: HTMLInputElement;

  /**
   * The theme color defined in the color palette. The default is primary.
   */
  @Prop({ reflectToAttr: true }) theme = 'primary';

  @Prop() name: string;

  /**
   * Text introduced in Button upload.
   */
  @Prop() uploadButtonText: string;

  @Prop({ mutable: true }) value: FileList;

  /**
   * State of focus, to control entries and exits of dragged files.
   */
  @State() focus: boolean;

  /**
   * Event when a file is dropped.
   */
  @Event({ eventName: 'uploadFile' }) change: EventEmitter<FileList>;

  @Listen('dragover', { passive: false })
  onHighLight(e) {
    e.preventDefault();
    e.stopPropagation();
    this.focus = true;
  }

  @Listen('drop', { passive: false })
  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.nativeInput.files = e.dataTransfer.files;
    this.handleChange();
    this.focus = false;
  }

  @Listen('dragleave')
  onLeave() {
    this.focus = false;
  }

  @Bind
  @Method()
  handleClick() {
    this.nativeInput.click();
  }

  @Method()
  removeFiles() {
    this.nativeInput.value = '';
  }

  @Bind
  handleChange() {
    this.value = this.nativeInput.files;
    this.change.emit(this.nativeInput.files);
  }

  hostData() {
    return {
      class: {
        [`ac-upload--${this.theme}`]: this.theme !== undefined,
        'ac-upload--focus': this.focus,
      }
    }
  }

  render() {
    return [
      <label
        class="ac-upload--drop-area"
      >
        <input
          onChange={this.handleChange}
          name={this.name}
          class="ac-upload--native-input"
          type="file"
          ref={nativeInput => this.nativeInput = nativeInput}
        />
        <div class="ac-upload--wrapper">
          <div class="ac-upload--content">
            <slot name="content"/>
          </div>
          <ac-button class="ac-upload--button" theme={this.theme} onClick={this.handleClick}>
            <ac-fa-icon slot="icon-start" icon={faUpload} size={14}/>
            {this.uploadButtonText}
          </ac-button>
        </div>
      </label>
    ];
  }
}
