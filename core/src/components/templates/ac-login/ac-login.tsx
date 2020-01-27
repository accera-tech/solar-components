import { Component, Element, Prop, h } from '@stencil/core';
import {AcNeogridShape} from "../../utils/ac-neogrid-shape";

/**
 * Accera's Login Page webcomponent.
 */
@Component({
  tag: 'ac-login',
  styleUrl: 'ac-login.scss',
  shadow: false
})
export class AcLayout {
  @Element() host;

  @Prop() backgroundImageSrc: string;

  render() {
    const backgroundImageStyle = {
      backgroundImage: `url(${this.backgroundImageSrc})`
    };

    return [
      <div class="ac-login__background-image" style={backgroundImageStyle} />,
      <AcNeogridShape class="ac-login__background" />,
      <div class="ac-login__wrapper">
        <div class="ac-login__container">
          <div class="ac-login__header">
            <slot name="header"/>
          </div>
          <div class="ac-login__content">
            <slot name="content" />
          </div>
          <div class="ac-login__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    ];
  }
}
