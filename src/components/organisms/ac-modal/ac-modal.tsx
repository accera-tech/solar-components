import { Component, Prop, Element } from '@stencil/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';
import { Bind } from '../../../utils/lang/bind';

@Component({
  tag: 'ac-modal',
  styleUrl: 'ac-modal.scss',
})
export class AcModal implements TransitionComponent {
  transitionBehavior = new TransitionBehavior(this);

  @Element() host: HTMLAcModalElement;
  @Prop() title: string;

  componentWillLoad() {}

  @Bind
  close() {
    this.host.remove();
  }

  render() {

    return (
      <div class="ac-modal__panel">
        <header class="ac-modal__header">
          <h1>{this.title}</h1>
          <ac-button fill="clear" theme="primary" icon-only onClick={this.close}>
            <ac-fa-icon icon={faTimes} />
          </ac-button>
        </header>
        <section class="ac-modal__content">
          <slot />
        </section>
        <footer class="ac-modal__footer">
          <slot name="modal-actions" />
        </footer>
      </div>
    );
  }
}
