import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';

import { groupBy } from '../../../utils/collections/group-by';
import { Bind } from '../../../utils/lang/bind';
import { Debounced } from '../../../utils/lang/reactivity';
import { AcFaIcon } from '../../utils/ac-fa-icon';

@Component({
  tag: 'ac-menu',
  styleUrl: 'ac-menu.scss'
})
export class AcMenu {
  menuContentElt: HTMLElement;
  searchInput: HTMLAcInputBaseElement;
  activeItem: HTMLAcMenuItemElement;
  childItems: HTMLAcMenuItemElement[];
  menuItems: any;

  @Element() host: HTMLAcMenuElement;

  @Prop() iconOnly: boolean;

  @Prop() searchable: boolean;

  // @TODO: Move labels configs to Solar's global state settings using dependency injection or global state.
  @Prop() searchLabel: string;
  @Prop() noResultsLabel: string;

  @Prop({ mutable: true }) selected: string | number;

  @State() searchFilter: string;

  @State() filteredItems: any;

  @Event() menuChange: EventEmitter<string>;

  @Watch('iconOnly')
  iconOnlyDidUpdate() {
    this.filteredItems = null;
    this.searchFilter = null;
    for (const menuItem of this.childItems) {
      menuItem.iconOnly = this.iconOnly;
    }
  }

  @Watch('searchFilter')
  searchFilterDidUpdate() {
    if (this.searchFilter) {

      this.filteredItems = [];
      Object.keys(this.menuItems)
        .forEach(key => {
          const items = this.menuItems[key]
            .filter(item => {
              return item.fuzzyDescription.indexOf(this.searchFilter.toLowerCase()) > 0
              && !item.elt.disabled;
            });

          if (items.length > 0) {
            this.filteredItems.push({ groupTitle: key !== 'null' ? key : null, items });
          }
        });

    } else {
      this.filteredItems = null;
    }
  }

  componentDidLoad() {
    this.loadItemsFromHTML();
  }

  private loadItemsFromHTML() {
    this.childItems = Array.from(this.menuContentElt.children)
      .filter(elt => elt.tagName === 'AC-MENU-ITEM') as HTMLAcMenuItemElement[];

    setTimeout(
      () => this.menuItems =
        Array.from(this.menuContentElt.querySelectorAll('ac-menu-item'))
        .filter(elt => !elt.submenu && !elt.disabled)
        .map(parseMenuItems)
        .reduce(groupBy('breadcrumbs'), {}),
      0);

    this.childItems.forEach(item => {
      if (!item.submenu) {
        item.addEventListener('click', () => this.selected = item.id);
      }
    });

    // tslint:disable-next-line:triple-equals
    const initialItem = this.childItems.find(item => item.id == this.selected);
    if (initialItem) {
      this.select(initialItem);
    }
  }

  @Watch('selected')
  onDidSelectedUpdate() {
    console.log(this.selected);
    // tslint:disable-next-line:triple-equals
    const targetItem = this.childItems.find(item => item.id == this.selected);
    this.select(targetItem);
  }

  /**
   * Mark a menu item as selected.
   */
  private select(item: HTMLAcMenuItemElement) {
    if (!this.activeItem) {
      this.activeItem = item;
    }
    if (this.activeItem.id !== item.id) {
      this.activeItem.active = false;
      this.menuChange.emit(item.id);
    }
    item.active = true;
    this.activeItem = item;
  }

  @Bind
  @Debounced(200)
  private async handleDebouncedKeyUp() {
    const nativeInput = await this.searchInput.getNativeInput();
    this.searchFilter = nativeInput.value;
  }

  hostData() {
    return {
      class: {
        'ac-menu--icon-only': this.iconOnly,
        'ac-menu--filtered': this.searchFilter
      }
    }
  }

  render() {
    return [
      // Searchbar
      this.searchable &&
        <ac-input-base
            class="ac-menu__search-bar"
            size="small"
            placeholder={this.searchLabel || 'Search'}
            onKeyUp={this.handleDebouncedKeyUp}
            ref={searchInput => this.searchInput = searchInput as HTMLAcInputBaseElement}
        >
          <AcFaIcon slot="item-start" icon={faSearch} size={12} />
        </ac-input-base>,

      // Content
      <div class="ac-menu__content" ref={menuContentElt => this.menuContentElt = menuContentElt}>
        <slot />
      </div>,

      // Search Results
      this.filteredItems && this.filteredItems.length > 0 &&
        <div class="ac-menu__search-results">
          {this.filteredItems.map(renderFilteredGroup)}
        </div>
    ];
  }
}

// Utils
// --------------------------------------------------

function parseMenuItems(elt) {
  const parents = getMenuItemHierarchy(elt, []).reverse();

  return {
    elt,
    parents,
    breadcrumbs: parents.length > 0 ? parents.join(' > ') : null,
    title: elt.innerText,
    href: elt.href,
    onClick: () => elt.click(),
    fuzzyDescription: (parents.join('; ') + '; ' + elt.innerText + '; ' + elt.href).toLowerCase()
  }
}

function getMenuItemHierarchy(elt, parents) {
  if (elt.parentElement.slot !== 'submenu') {
    return parents;
  }

  const menuItem = elt.parentElement.parentElement.parentElement;
  parents.push(menuItem.querySelector('.ac-menu-item__native > .ac-menu-item__text').innerText);
  return getMenuItemHierarchy(menuItem, parents)
}

function renderFilteredGroup(group) {
  return (
    <div class="ac-menu__group">
      <span class="ac-menu__group-title">{group.groupTitle}</span>
      {
        group.items.map(item => (
          <ac-menu-item href={item.href} onClick={item.onClick}>
            {item.title}
          </ac-menu-item>
        ))
      }
    </div>
  );
}
