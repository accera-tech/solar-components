import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, h } from '@stencil/core';

import { count } from '../../../utils/lang/count';
import { AcFaIcon } from '../../utils/ac-fa-icon';

/**
 * Accera's full-featured stepper web-component.
 */
@Component({
  tag: 'ac-stepper',
  styleUrl: 'ac-stepper.scss'
})
export class AcStepper implements ComponentInterface {

  /**
   * The count of steps to be displayed.
   * TODO: It mighty support an array of steps in the future.
   */
  @Prop({ reflectToAttr: true }) steps: number;

  /**
   * The number of concluded steps.
   */
  @Prop({ reflectToAttr: true, mutable: true }) done: number;

  /**
   * Dispatched when the steps state changes.
   */
  @Event() stepperChange: EventEmitter<{ index: number }>;

  /**
   * Increments the count of concluded steps.
   */
  @Method()
  async next() {
    if (this.done < this.steps) {
      this.done++;
      this.stepperChange.emit({ index: this.done });
    }
  }

  /**
   * Decrement the count of concluded steps.
   */
  @Method()
  async previous() {
    if (this.done > 0) {
      this.done--;
      this.stepperChange.emit({ index: this.done });
    }
  }

  render() {
    return [
      ...count(this.steps).map(i =>
        <li class={'ac-stepper__step ' + (this.done >= i ? 'ac-stepper__step--active' : '')}>
          {i + 1}
        </li>
      ),
      <li class={'ac-stepper__step ' + (this.done === this.steps ? 'ac-stepper__step--active' : '')}>
        <AcFaIcon icon={faCheck} />
      </li>
    ];
  }
}
