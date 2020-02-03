import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Host, Prop, h, Event, EventEmitter } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';
import { createElementRef } from '../../../utils/stencil/create-element-ref';
import { AcFaIcon } from '../../utils/ac-fa-icon';

@Component({
  tag: 'ac-collapse',
  styleUrl: 'ac-collapse.scss'
})
export class AcCollapse {
  private collapseContent = createElementRef<HTMLAcCollapseElement>();

  @Element() host: HTMLElement;

  @Prop() expanded: boolean;

  @Event() toggle: EventEmitter<{ expanded: boolean }>;

  @Bind
  async handleToggle() {
    this.expanded = !this.expanded;
    this.toggle.emit({ expanded: this.expanded });
  }

  render() {
    const icon = this.expanded ? faChevronUp : faChevronDown;
    // @TODO: Review animation util usage.
    const contentHeight = (this.expanded ? this.collapseContent.nativeElement.children[0].clientHeight : 0) + 'px';

    return (
      <Host
        class={{
          'ac-collapse--expanded': this.expanded,
        }}
      >
        <ac-card class="ac-collapse__card">
          <div class="ac-collapse__header">
            <div class="ac-collapse__header-wrapper">
              <slot name="header"/>
            </div>
            <ac-button
              class="ac-collapse__toggle-button"
              shape="round"
              fill="clear"
              theme="primary"
              onClick={this.handleToggle}
              icon-only
            >
              <AcFaIcon icon={icon}/>
            </ac-button>
          </div>
          <div
            class="ac-collapse__content"
            ref={this.collapseContent}
            style={{ height: contentHeight }}
          >
            <slot name="content"/>
          </div>
        </ac-card>
      </Host>
    );
  }
}
