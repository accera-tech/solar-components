import { Component, Prop, Element, ComponentInterface } from '@stencil/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Bind } from '../../../utils/lang/bind';
import { hasShadowDom } from '../../../utils/dom';

/**
 * Accera's full-featured button webcomponent.
 */
@Component({
  tag: 'ac-button',
  styleUrl: 'ac-button.scss',
  shadow: true
})
export class AcButton implements ComponentInterface {
  @Element() host: HTMLAcButtonElement;

  /**
   * The HTML5 button type.
   * See https://mdn.io/button
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * When hover this button, present a tootip text.
   */
  @Prop() tooltip?: string;

  /**
   * The theme color defined in the color palette. The default is white.
   */
  @Prop() theme?: string;

  /**
   * The size of the button:
   * * small - height: 36px
   * * big - height: 50px
   * * default - 44px
   */
  @Prop() size?: 'small' | 'big';

  /**
   * Fill mode:
   * * flat - No borders and no raising
   * * solid - Raised button, default
   * * clear - No background and no borders
   */
  @Prop() fill: 'clear' | 'solid' | 'flat' | 'outline' = 'solid';

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
   * The HTML5 native disable prop.
   */
  @Prop({ reflectToAttr: true }) disabled?: boolean;

  /**
   * Set the loading mode, showing a loading icon.
   */
  @Prop() loading: boolean;


  @Bind
  private handleClick() {
    if (this.type === 'submit' && hasShadowDom(this.host)) {
      // WEBCOMPONENTS PECULIARITY:
      // Shadow dom doesn't dispatch events to outside.
      // So we need to dispatch submit events by the hand.
      const form: HTMLFormElement = this.host.closest('form');
      if (form) form.dispatchEvent(new Event('submit'));
    }
  }

  hostData() {
    return {
      attribute: 'button',
      class: {
        [`ac-button--${this.theme}`]: this.theme !== undefined,
        [`ac-button--${this.size}`]: this.size !== undefined,
        [`ac-button--${this.fill}`]: this.fill !== undefined,
        'ac-button--icon-only': this.iconOnly,
        'ac-button--disabled': this.disabled,
        'ac-button--loading' : this.loading
      }
    };
  }

  render() {
    const TagType = this.href ? 'a' : 'button';
    const attrs = (TagType === 'button')
      ? { type: this.type }
      : { href: this.href, target: this.target };

    return (
      <TagType
        {...attrs}
        disabled={this.disabled}
        class="ac-button__native"
        onClick={this.handleClick}
      >
        { /** If is a textual button and its loading, shows a loading icon in the icon-start slot **/ }
        { !this.iconOnly && this.loading
          ? <ac-fa-icon icon={faSpinner} size={14} anim="spin" />
          : <slot name="icon-start" /> }
        <span class="ac-button__text">
          { this.iconOnly && this.loading && <ac-fa-icon icon={faSpinner} size={12} anim="spin" /> }
          { /** If is a icon only button and its loading, hides the main icon **/  }
          { !this.iconOnly || (this.iconOnly && !this.loading) ? <slot /> : null }
        </span>
        <slot name="icon-end" />
      </TagType>
    );
  }
}
