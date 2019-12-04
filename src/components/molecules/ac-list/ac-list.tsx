import { Component, Prop, Method, Element, h, EventEmitter, Event, Watch } from '@stencil/core';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from '../../../utils/lang/string';

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

  /**
   * Event trigger on state change
   * @param {AcList} acList - Component.
   */
  @Event() listChange: EventEmitter<AcList>;


  @Watch('options')
  handleOptionsChange() {
    this.options
      .forEach((option, index) => {
        if (option.order === undefined) {
          option.order = index;
        }
      });
    this.listChange.emit(this);
  }

  private updateSelectedOptions(option) {
    if (this.multiple === false) {
      this.options.filter(x => x.value !== option.value).forEach(x => x.selected = false);
    }
    option.selected = !option.selected;
    this.options = [ ...this.options ];
    this.listChange.emit(this);
  }

  handleSelect(e, option) {
    e.stopImmediatePropagation();
    this.updateSelectedOptions(option);
  }

  handleChecked(e, option) {
    /* TODO: review ac-check fire more than once */
    e.stopImmediatePropagation();
    if (!e.srcElement.classList.contains('ac-check__native')) {
      return;
    }
    if (this.multiple === false) {
      this.options.filter(x => x.value !== option.value).forEach(x => x.selected = false);
    }
    this.updateSelectedOptions(option);
  }

  @Method()
  async getSelectedOptions() {
    return Promise.resolve(this.options.filter(x => x.selected));
  }

  componentDidLoad() {
    if (!this.options) {
      this.loadOptionsFromHTML();
    }
  }

  loadOptionsFromHTML() {
    const listItems = Array.from(this.host.querySelectorAll('option'));
    if (listItems) {
      this.options = listItems
      .map((item: any) => {
        return ({
          title: item.text,
          value: item.value,
          selected: item.hasAttribute('selected') ? item.selected : false,
          separator: false,
          group: item.parentElement.tagName === 'OPTGROUP' ? item.parentElement.label : null
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
          {this.label} ({this.options ? this.options.length : 0})
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
              : !isEmpty(this.filterText) && <li class="ac-list__list-item ac-list__list-item--empty">{this.noResultsLabel}</li>
            }
          </ol>
        </section>
    ];
  }

  private renderList() {
    if (this.options) {
      const options = this.filterText
        ? this.options.filter(option => option.title.toUpperCase().includes(this.filterText.toUpperCase()))
        : this.options;
      let hasGroup = false;
      const a = options
              .sort((a, b) => a.order > b.order ? 1 : -1)
              .reduce((state, option) => {
                if (!(state.has(option.group))) {
                  hasGroup = hasGroup === false && !isEmpty(option.group) ? true : hasGroup;
                  state.set(option.group, [(
                    <li class="ac-list__list-separator">
                      <span class="ac-list__list-separator-title">{option.group}</span>
                      <span class="ac-list__list-separator-line"></span>
                    </li>
                  )]);
                }
                const elements = state.has(option.group)
                  ? state.get(option.group)
                  : [];
                elements.push((
                  <li value={option.value}
                      key={option.value}
                      class={{
                        "ac-list__list-item": true,
                        "ac-list__list-item--selected": option.selected
                      }}
                      onClick={(e) => this.handleSelect(e, option)}>
                    {this.multiple && <ac-check class="ac-list__checkbox"
                      checked={option.selected} onClick={(e) => this.handleChecked(e, option)}></ac-check>}
                    {option.title}
                  </li>
                ));
                state.set(option.group, elements);
                return state;
              }, new Map());
      return Array.from(a.values()).reduce((result, arr) => {
        if (hasGroup === false) {
          arr.splice(0, 1);
        }
        return result.concat(arr);
      } , []);
    }
    return [];
  }

  private setFilterText = (text: string) => this.filterText = text;
}

export interface ListOption<T = {}> {
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