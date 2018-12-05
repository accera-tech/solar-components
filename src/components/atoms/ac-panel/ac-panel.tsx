import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'ac-panel',
  styleUrl: 'ac-panel.scss',
  shadow: true
})
export class AcPanel {
  /**
   * An array of items to display in this panel.
   */
  @Prop() items?: AcPanelItem[];

  /**
   * Fired when the user clicks over a item.
   */
  @Event() select: EventEmitter<{ index: number, item: AcPanelItem }>;

  render() {
    return (
      <ul class="ac-panel__list">
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
