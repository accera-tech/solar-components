import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Host, Method, Prop, h } from '@stencil/core';

import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';
import { Bind } from '../../../utils/lang/bind';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { AcNeogridShape } from '../../utils/ac-neogrid-shape';

@Component({
  tag: 'ac-toast',
  styleUrl: 'ac-toast.scss'
})
export class AcToast implements TransitionComponent {
  transitionBehavior = new TransitionBehavior(this);

  @Prop() type: 'alert' | 'success' | 'info' | 'warning';

  @Prop() title: string;

  @Prop() message: string;

  @Element() host: HTMLAcToastElement;

  @Event({ eventName: 'close' }) closeEv: EventEmitter<void>;

  componentWillLoad() {
  }

  componentDidUnload() {
    this.closeEv.emit();
  }

  @Bind
  @Method()
  async close() {
    this.host.remove();
  }

  render() {
    return (
      <Host
        class={{
          [`ac-toast--${this.type}`]: this.type !== undefined,
        }}
      >
      <header class="ac-toast__header">
        <h3>{this.title}</h3>
        <AcFaIcon
          class="ac-toast__header-icon"
          icon={faTimes}
          onClick={this.close}
        />
        <AcNeogridShape onClick={this.close} class="ac-toast__header-bg" />
      </header>
      <section class="ac-toast__content">
        <span class="ac-toast__content-text">{this.message}</span>
      </section>
      </Host>
    );
  }
}
