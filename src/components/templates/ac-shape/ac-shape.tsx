import { Component, Element, h } from '@stencil/core';
import { AcNeogridShape } from '../../utils/ac-neogrid-shape';

/**
 * Accera's Shape Page webcomponent.
 */
@Component({
  tag: 'ac-shape',
  styleUrl: 'ac-shape.scss',
  shadow: false
})
export class Acshape {
  @Element() host;

  render() {
    return [
      <slot name="background"/>,
      <AcNeogridShape class="ac-shape__background"/>,
      <div class="ac-shape__wrapper">
        <div class="ac-shape__container">
          <div class="ac-shape__header">
            <slot name="header"/>
          </div>
          <div class="ac-shape__content">
            <slot name="content"/>
          </div>
          <div class="ac-shape__footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    ];
  }
}
