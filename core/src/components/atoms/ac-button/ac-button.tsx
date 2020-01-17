import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Component, ComponentInterface, Element, Host, Prop, h } from '@stencil/core';

import { AcFaIcon } from '../../utils/ac-fa-icon';

/**
 * Accera's full-featured button web-component.
 */
@Component({
  tag: 'ac-button',
  styleUrl: 'ac-button.scss',
})
export class AcButton implements ComponentInterface {
  @Element() host: HTMLAcButtonElement;

  /**
   * The HTML5 button type.
   * See https://mdn.io/button
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * The theme color defined in the color palette. The default is white.
   */
  @Prop() theme;

  /**
   * The size of the button.
   */
  @Prop() size?: 'small' | 'large';

  /**
   * Fill mode:
   * * flat - No borders and no raising
   * * solid - Raised button, default
   * * clear - No background and borders
   */
  @Prop() fill: 'clear' | 'solid' | 'flat' = 'solid';

  /**
   * Button width.
   */
  @Prop() expand: 'block' | undefined;

  /**
   * Button shape.
   */
  @Prop() shape: 'round' | undefined;

  /**
   * An optional link to open when click on it.
   * Turns the button into a anchor element.
   */
  @Prop() href?: string;

  /**
   * The HTML5 native anchor target to handle the href property.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top' | string;

  /**
   * Icon only mode, with a square button, centered icon.
   */
  @Prop() iconOnly: boolean;

  /**
   * Set the loading mode, showing a loading icon.
   */
  @Prop() loading: boolean;

  /**
   * The HTML5 native disable prop.
   */
  @Prop({ reflectToAttr: true }) disabled?: boolean;

  render() {
    const TagType = this.href ? 'a' : 'button';
    const attrs = (TagType === 'button')
      ? { type: this.type }
      : { href: this.href, target: this.target };

    return (
      // @ts-ignore
      <Host
        class={{
          [`ac-button--${this.theme}`]: this.theme !== undefined,
          [`ac-button--${this.size}`]: this.size !== undefined,
          [`ac-button--${this.fill}`]: this.fill !== undefined,
          [`ac-button--${this.expand}`]: this.expand !== undefined,
          [`ac-button--${this.shape}`]: this.shape !== undefined,
          'ac-button--icon-only': this.iconOnly,
          'ac-button--disabled': this.disabled,
          'ac-button--loading': this.loading,
        }}
      >
        <TagType
          {...attrs}
          disabled={this.disabled}
          class="ac-button__native"
        >
          {this.loading && <AcFaIcon icon={faSpinner} size={14} anim="spin" style={{width: '14px'}}/>}
          <slot name="icon-start"/>
          <span class="ac-button__text">
          <slot/>
        </span>
          <slot name="icon-end"/>
        </TagType>
      </Host>
    );
  }
}
