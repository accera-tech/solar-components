import { Component, Prop } from '@stencil/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * Accera's full-featured FontAwesome SVG Icon webcomponent.
 */
@Component({
  tag: 'ac-fa-icon',
  styleUrl: 'ac-fa-icon.scss',
  shadow: true
})
export class AcFaIcon {
  /**
   * The icon imported from @fortawesome/free-solid-svg-icons.
   */
  @Prop() icon: IconDefinition;

  /**
   * The size of the icon in px.
   */
  @Prop() size = 16;

  /**
   * Set an animation defined in the ac-fa-icon.scss
   */
  @Prop() anim: string;

  hostData() {
    return {
      attribute: 'svg',
      class: {
        [`icon--anim-${this.anim}`]: this.anim
      }
    }
  }

  render() {
    const { icon } = this.icon;

    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${icon[0]} ${icon[1]}`} height={this.size}>
        <path d={icon[4]} />
      </svg>
    );
  }
}
