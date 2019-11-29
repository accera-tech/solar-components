import { Component, Prop, Method, Element, h } from '@stencil/core';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'ac-list',
  styleUrl: 'ac-list.scss'
})
export class AcList {

  /**
   * Reference to the component
   */
  @Element() host: HTMLAcListElement;

  @Prop() filterText: string;
  /**
   * List of all options available.
   */
  @Prop({ mutable: true }) options: ListOption[];
  /**
   * Used to customize the searchbar's label
   */
  @Prop() searchLabel: string;
  /**
   * Used to customize the field label
   */
  @Prop() label: string;
  /**
   * Message that will be rendered with the search results in zero items
   */
  @Prop() noResultsLabel: string;
  /**
   * If true, the component will handle multiple selected items.
   */
  @Prop({ reflectToAttr: true }) multiple: boolean = false;

  handleSelect(option) {
    if (this.multiple === false) {
      this.options.filter(x => x.value !== option.value).forEach(x => x.selected = false);
    }
    option.selected = !option.selected;
    this.options.splice(option.index, 1, option);
    this.options = [ ...this.options ];
  }

  @Method()
  async getSelectedOptions() {
    return Promise.resolve(this.options.filter(x => x.selected));
  }

  componentDidLoad() {
    if (!this.options) {
      this.loadOptionsFromHTML();
    } else {
      this.options.forEach((option, index) => option.index = index);
    }
  }

  loadOptionsFromHTML() {
    const listItems = Array.from(this.host.querySelectorAll('optgroup, option'));
    if (listItems) {
      this.options = listItems.map((item: any, index) => {
        return ({
          index,
          title: item.tagName === 'OPTGROUP' ? item.label : item.text,
          value: item.value,
          selected: item.hasAttribute('selected') ? item.selected : false,
          separator: item.tagName === 'OPTGROUP',
          group: item.parentElement.tagName === 'OPTGROUP' ? item.parentElement.label : item.label
        }) as ListOption
      });
    }
  }
  render() {
    const listItems = this.renderList();
    return [
        <section style={{ display: 'none' }}>
          <slot />
        </section>,
        <label class="ac-list__header-title">
          {this.label} ({this.options ? this.options.filter(x => x.selected).length : 0})
        </label>,
        <section class="ac-list__container" >
          <ac-input-base
            class="ac-list__search-bar"
            type="text"
            placeholder={this.searchLabel}
            value={this.filterText}
            onChange={({ target: { value } }: any) => this.setFilterText(value)}
            size="small"
          >
            <ac-button
              slot="item-start"
              fill="clear"
              icon-only
            >
              <AcFaIcon icon={faSearch} class="ac-list__search-bar-icon" size={12}  />
            </ac-button>
          </ac-input-base>
          <ol class="ac-list__list">
            {listItems.length > 0
              ? listItems
            : <li class="ac-list__list-item ac-list__list-item--empty">{this.noResultsLabel}</li>
            }
          </ol>
        </section>
    ];
  }

  private renderList() {
    const itemsToRender = this.options
      && this.options
        .reduce((stateList, option) => {
          let showElement = true;
          if (this.filterText && option.separator === false) {
            showElement = option.title.toUpperCase().includes(this.filterText.toUpperCase());
            if (showElement) {
              stateList.groups[option.group] = true;
            }
          }
          if (showElement) {
            stateList.items.push(option);
          }
          return stateList;
        }, { groups: {}, items: [] });


    return itemsToRender
        ? itemsToRender
        .items
        .filter(option => this.filterText && option.separator ? option.group in itemsToRender.groups : true)
        .map((option) => {
          if (option.separator) {
            return (
              <li class="ac-list__list-separator">
                <span class="ac-list__list-separator-title">{option.title}</span>
                <span class="ac-list__list-separator-line"></span>
              </li>
            )
          } else {
            return (
              <li
                  class={{
                    "ac-list__list-item": true,
                    "ac-list__list-item--selected": option.selected
                  }}
                  onClick={() => this.handleSelect(option)}>
                {this.multiple && <ac-check class="ac-list__checkbox"
                  checked={option.selected} onChange={() => this.handleSelect(option)}></ac-check>}
                {option.title}
              </li>
            );
          }
        })
      : [];
  }

  private setFilterText = (text: string) => this.filterText = text;
}

export interface ListOption<T = {}> {
  index: number;
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
}