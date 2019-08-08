import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ac-avatar',
  styleUrl: 'ac-avatar.scss',
})

export class AcAvatar {
  @Prop() mode: 'list-item' | undefined;

  @Prop({ mutable: true }) image: string;

  @Prop() title: string;

  @Prop() subtitle: string;

  hostData() {
    return {
      class: {
        [`ac-badge--${this.mode}`]: this.mode !== undefined,
      }
    };
  }
  render() {
    return [
      <div class="ac-avatar__image" style={{ backgroundImage: `url(${this.image})` }} />,
      <div class="ac-avatar__text">
        <span class="ac-avatar__title">{this.title}</span>
        <span class="ac-avatar__subtitle">{this.subtitle}</span>
      </div>
    ]
  }
}
