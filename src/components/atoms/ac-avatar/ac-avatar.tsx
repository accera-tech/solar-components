import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ac-avatar',
  styleUrl: 'ac-avatar.scss',
})

export class AcAvatar {
  @Prop() mode: 'list-item' | undefined;

  @Prop({ mutable: true }) image: string;

  @Prop() title: string;

  @Prop() subtitle: string;

  @Prop() href: string;

  @Prop() target: string;

  render() {
    return (
      <Host
        class={{
          [`ac-badge--${this.mode}`]: this.mode !== undefined,
        }}
      >
        <a class="ac-avatar__native" href={this.href} target={this.target}>
          <div class="ac-avatar__image" style={{ backgroundImage: `url(${this.image})` }}/>
          <div class="ac-avatar__text">
            <span class="ac-avatar__title">{this.title}</span>
            <span class="ac-avatar__subtitle">{this.subtitle}</span>
          </div>
        </a>
      </Host>
    );
  }
}
