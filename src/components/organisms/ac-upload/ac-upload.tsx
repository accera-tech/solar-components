import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Component, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';

@Component({
  tag: 'ac-upload',
  styleUrl: 'ac-upload.scss',
  shadow: false
})

export class AcUpload {
  private nativeInput: HTMLInputElement;

  /**
   * The theme color defined in the color palette. The default is primary.
   */
  @Prop({ reflectToAttr: true }) theme = 'primary';

  /**
   * Text introduced in Button upload.
   */
  @Prop() buttontext: string;

  /**
   * State of focus, to control entries and exits of dragged files.
   */
  @State() focus: boolean;

  /**
   * Event when a file is dropped.
   */
  @Event({ eventName: 'fileDrop' }) fileDrop: EventEmitter<FileList>;

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
    this.fileDrop.emit(e.dataTransfer.files);
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
        class="drop-area"
      >
        <input class="input-upload" type="file" ref={nativeInput => this.nativeInput = nativeInput}/>
        <div class="drop-area--content">
          {
            <slot name="text-area"/> ? <div class="text-area">
              <slot name="text"/>
            </div> : null
          }
          <ac-button theme="secondary" fill="solid" onClick={this.handleClick}>
            <ac-fa-icon slot="icon-start" icon={faUpload} size={14}/>
            {this.buttontext}
          </ac-button>
        </div>
      </label>
    ];
  }
}
