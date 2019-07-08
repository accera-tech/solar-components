import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Method, Prop } from '@stencil/core';

import { TransitionBehavior } from '../../../behaviors/transition-behavior';
import { Bind } from '../../../utils/lang/bind';
import { AcNeogridOverlaySvg } from '../../utils/ac-neogrid-overlay-svg';

// import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';

@Component({
  tag: 'ac-toast',
  styleUrl: 'ac-toast.scss'
})
export class AcToast {
  // transitionBehavior = new TransitionBehavior(this);

  transitionBehavior = new TransitionBehavior(this);

  @Prop() type: 'alert' | 'success' | 'info' | 'warning';

  @Prop() title: string;

  @Prop() message: string;

  @Prop() time: number;

  @Element() host: HTMLAcToastElement;

  @Event({ eventName: 'close' }) closeEv: EventEmitter<void>;

  componentWillLoad() {
  }

  componentDidUnload() {
    this.closeEv.emit();
  }

  @Bind
  @Method()
  private close() {
    this.host.remove();
  }

  hostData() {
    return {
      attribute: 'toast',
      class: {
        [`ac-toast--${this.type}`]: this.type !== undefined,
      }
    };
  }

  render() {
    return [
      <header class="ac-toast__header">
        <h3>{this.title}</h3>
        <ac-fa-icon class="ac-toast__header-icon" icon={faTimes} onClick={this.close} />
        <AcNeogridOverlaySvg onClick={this.close} class="ac-toast__header-bg" />
      </header>,
      <section class="ac-toast--content">
        <span class="ac-toast--content__text">{this.message}</span>
      </section>

    ];
  }
}
