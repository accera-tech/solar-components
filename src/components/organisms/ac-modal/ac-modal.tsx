import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';

import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';
import { Bind } from '../../../utils/lang/bind';
import { AcFaIcon } from '../../utils/ac-fa-icon';

/**
 * Accera's full-featured modal web-component.
 */
@Component({
  tag: 'ac-modal',
  styleUrl: 'ac-modal.scss',
})
export class AcModal implements TransitionComponent {
  /**
   * The instance of the transition behavior used to animate this component.
   */
  transitionBehavior = new TransitionBehavior(this);

  @Element() host: HTMLAcModalElement;

  /**
   * The title that will be displayed on the modal.
   */
  @Prop() title: string;

  /**
   * Dispatched when the modal closes.
   */
  @Event({ eventName: 'close' }) closeEv: EventEmitter<void>;

  componentWillLoad() {}
  componentDidUnload() {
    this.closeEv.emit();
  }

  @Bind
  private close() {
    this.host.remove();
  }

  render() {

    return [
      <header class="ac-modal__header">
        {
          this.title ?
            <span class="ac-modal__title">{this.title}</span> :
            <slot name="modal-title" />
        }
        <ac-button fill="clear" theme="primary" shape="round" icon-only onClick={this.close}>
          <AcFaIcon icon={faTimes} />
        </ac-button>
      </header>,
      <section class="ac-modal__content">
        <slot />
      </section>,
      <footer class="ac-modal__footer">
        <slot name="modal-actions" />
      </footer>
    ];
  }
}
