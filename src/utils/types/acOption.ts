export interface AcOption<T = {}> {
  /**
   * The title that will be displayed in the item
   */
  title: string;

  /**
   * The value of this item that will be handled by select listeners.
   */
  value: number | string;

  /**
   * If true, this item will be displayed as a selected item.
   */
  selected?: boolean;

  /**
   * If true, style this item as a list separator.
   */
  separator?: boolean;

  /**
   * The label of the options group of this item.
   */
  group?: string;

  /**
   * A custom data
   */
  data?: T;
  /**
   * Represents order of the element.
   */
  order: number;
}