import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Component, ComponentInterface, Element, Prop } from '@stencil/core';

/**
 * Accera's full-featured button webcomponent.
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
   * When hover this button, present a tooltip text.
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
  @Prop() fill: 'clear' | 'solid' | 'flat' = 'solid';

  /**
   * Button in width mode.
   */
  @Prop() expand: 'block' | 'circle';

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

  hostData() {
    return {
      attribute: 'button',
      class: {
        [`ac-button--${this.theme}`]: this.theme !== undefined,
        [`ac-button--${this.size}`]: this.size !== undefined,
        [`ac-button--${this.fill}`]: this.fill !== undefined,
        [`ac-button--${this.expand}`]: this.expand !== undefined,
        'ac-button--icon-only': this.iconOnly,
        'ac-button--disabled': this.disabled,
        'ac-button--loading' : this.loading,
      }
    };
  }

  render() {
    const TagType = this.href ? 'a' : 'button';
    const attrs = (TagType === 'button')
      ? { type: this.type }
      : { href: this.href, target: this.target };

    return (
      // @ts-ignore
      <TagType
        {...attrs}
        disabled={this.disabled}
        class="ac-button__native"
      >
        {/* If is a textual button and its loading, shows a loading icon in the icon-start slot */}
        { !this.iconOnly && this.loading
          ? <ac-fa-icon icon={faSpinner} size={14} anim="spin" />
          : <slot name="icon-start" /> }
        <span class="ac-button__text">
          {this.iconOnly && this.loading && <ac-fa-icon icon={faSpinner} size={12} anim="spin" />}
          {/* If is a icon only button and its loading, hides the main icon */}
          {!this.iconOnly || (this.iconOnly && !this.loading) ? <slot /> : null}
        </span>
        <slot name="icon-end" />
      </TagType>
    );
  }
}
