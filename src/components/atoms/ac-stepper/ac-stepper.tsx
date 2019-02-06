import { Component, ComponentInterface, Method, Prop, Event, EventEmitter } from '@stencil/core';
import { count } from '../../../utils/lang/count';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'ac-stepper',
  styleUrl: 'ac-stepper.scss'
})
export class AcStepper implements ComponentInterface {

  @Prop({ reflectToAttr: true }) steps: number;
  @Prop({ reflectToAttr: true, mutable: true }) done: number;

  @Method()
  next() {
    if (this.done < this.steps) {
      this.done++;
      this.change.emit({ index: this.done });
    }
  }

  @Method()
  previous() {
    if (this.done > 0) {
      this.done--;
      this.change.emit({ index: this.done });
    }
  }

  @Event() change: EventEmitter<{ index: number }>;

  render() {
    return [
      ...count(this.steps).map(i =>
        <li class={'ac-stepper__step ' + (this.done >= i ? 'ac-stepper__step--active' : '')}>
          {i + 1}
        </li>
      ),
      <li class={'ac-stepper__step ' + (this.done == this.steps ? 'ac-stepper__step--active' : '')}>
        <ac-fa-icon icon={faCheck} />
      </li>
    ]
  }
}
