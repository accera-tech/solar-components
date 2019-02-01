import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { TransitionBehavior, TransitionComponent } from '../../../behaviors/transition-behavior';

/**
 * Accera's Panel webcomponent used as a menu.
 */
@Component({
  tag: 'ac-panel',
  styleUrl: 'ac-panel.scss',
})
export class AcPanel implements TransitionComponent {
  transitionBehavior = new TransitionBehavior(this);
  @Element() host: HTMLAcPanelElement;

  /**
   * An array of items to display in this panel.
   */
  @Prop() items?: AcPanelItem[];

  /**
   * The CSS max height of this panel.
   */
  @Prop() maxHeight?: string;

  /**
   * Fired when the user clicks over a item.
   */
  @Event() select: EventEmitter<{ index: number, item: AcPanelItem }>;

  componentWillLoad() {}

  render() {
    return (
      <ul class="ac-panel__list" style={{ maxHeight: this.maxHeight }}>
        {this.items && this.items.map((item, index) => (
          <li class={'ac-panel__list-item ' + (item.selected ? 'ac-panel__list-item--selected' : '')}
              onClick={() => this.select.emit({ item, index })}>
            {item.title}
          </li>
        ))}
      </ul>
    );
  }
}

/**
 * Defines an item of the AcPanel.
 */
export interface AcPanelItem {
  /**
   * The title that will be displayed in the item
   */
  title: string;

  /**
   * The value of this item that will be handled by select listeners.
   */
  value: any;

  /**
   * If true, this item will be displayed as a selected item.
   */
  selected?: boolean
}
