import { Component, Prop, Host, h, State, Method, Element } from '@stencil/core';
import { AcOrderList } from '../../molecules/ac-order-list/ac-order-list';
import { Bind } from '../../../utils/lang/bind';
import dragula from 'dragula';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { AcOption } from '../../../utils/types/ac-option';


@Component({
  tag: 'ac-pick-list',
  styleUrl: 'ac-pick-list.scss'
})
export class AcPickList {
  private acListAvalibles: HTMLAcOrderListElement;
  private acListSelectedOptions: HTMLAcOrderListElement;

  /**
   * Reference to the component
   */
  @Element() host: HTMLAcPickListElement;

  /**
   * Number of available options to select.
   */
  @State() numberAvailableOptionsSelected = 0;
  /**
   * Number of selected options.
   */
  @State() numberOfSelectedOptions = 0;
  /**
   * List of all options available.
   */
  @Prop() options: AcOption[];
  /**
   * Text to be search.
   */
  @Prop() searchLabel: string = 'Search';
  /**
   * Label to be show when no results is fouond.
   */
  @Prop() noResultsLabel: string;
  /**
   * Label for ac-list of avalible options
   */
  @Prop() availableLabel: string;
  /**
   * Label for ac-list of selected options
   */
  @Prop() selectedLabel: string;
  /**
   * Label of the button that add options on the  selected ac-list.
   */
  @Prop() addLabel: string = 'Add';
  /**
   * Label of the button that add all options on the selected ac-list.
   */
  @Prop() addAllLabel: string = 'Add all';
  /**
   * Label of the button that remove options on the on selected ac-list.
   */
  @Prop() removeLabel: string = 'Remove';
  /**
   * Label of the button that remove all options on the  selected ac-list.
   */
  @Prop() removeAllLabel: string = 'Remove All';

  /**
   * Return the selected items.
   */
  @Method()
  getSelectedOptions() {
    return Promise.resolve(this.acListSelectedOptions.options);
  }

  /**
   * Method that add all options on the selected ac-list
   */
  @Bind
  addAllOptions() {
    if (this.acListAvalibles.options) {
      this.acListSelectedOptions.options = [
        ...this.acListAvalibles.options
      ];
      this.acListAvalibles.options = [];
    }
  }

  /**
   * Method that add options on the selected ac-list
   */
  @Bind
  addSelectedOptions() {
    if (this.acListAvalibles.options) {
      this.acListSelectedOptions.options = this.acListAvalibles
      .options
      .reduce((newList, option) => {
        if (option.selected) {
          newList.push({
            ...option,
            selected: false
          });
        }
        return newList
      }, [...this.acListSelectedOptions.options]);
      this.acListAvalibles.options = this.acListAvalibles.options
        .filter(x => x.selected === false);
    }
  }

  /**
   * Method that remove all options on the selected ac-list
   */
  @Bind
  removeAllOptions() {
    this.acListAvalibles.options = [
      ...this.acListAvalibles.options,
      ...this.acListSelectedOptions.options
    ];
    this.acListSelectedOptions.options = [];
  }

  /**
   * Method that remove options on the selected ac-list
   */
  @Bind
  removeOptions() {
    this.acListAvalibles.options = this.acListSelectedOptions.options
    .reduce((newList, option) => {
      if (option.selected) {
        newList.push({
          ...option,
          selected: false
        });
      }
      return newList;
    }, [...this.acListAvalibles.options]);

    this.acListSelectedOptions.options = this.acListSelectedOptions.options
       .filter(x => x.selected === false);
  }

  /**
   * Method that handle selected options.
   */
  @Bind
  handleChangeAclistSelectedOptions(event: CustomEvent<AcOrderList>) {
    if(event.detail) {
      event.detail.getSelectedOptions()
      .then(({length}) => this.numberOfSelectedOptions = length);
    } else {
      this.numberOfSelectedOptions = 0;
    }
  }
  /**
   * Method that handle changes on ac-list of avalibles options.
   */
  @Bind
  handleChangeAclistAvailableOptionsSelected(event: CustomEvent<AcOrderList>) {
    if(event.detail) {
      event.detail.getSelectedOptions()
      .then(({length}) => this.numberAvailableOptionsSelected = length);
    } else {
      this.numberAvailableOptionsSelected = 0;
    }
  }

  componentDidRender() {
    const drake = dragula([this.acListAvalibles.querySelector('.ac-list'), this.acListSelectedOptions.querySelector('.ac-list')], {
      invalid: (el: HTMLElement) => {
        return el.classList.contains('ac-list__list-separator');
      }
    });
    drake
    .on('drop', (el, target, source) => {
        drake.cancel(true);
        if (!source.parentElement || !target.parentElement) {
          return;
        }
        const acListSource = source.parentElement.parentElement;
        const acListTarget = target.parentElement.parentElement;
        if (acListTarget === acListSource) {
          return;
        }
        const option = acListSource.options.find(x => x.value.toString() === el.value.toString());
        if (option) {
          option.selected = false;
          el.remove();
          acListSource.options = acListSource.options.filter(x => x.value.toString() !== el.value.toString());
          acListTarget.options = [
            option,
            ...acListTarget.options
          ];
        }
      });
  }

  render() {
    const disabledAddAll = this.acListAvalibles
      ? this.acListAvalibles.options.length === 0
      : false;
    const disabledRemoveAll = this.acListSelectedOptions ? this.acListSelectedOptions.options.length === 0 : true;
    return (
    <Host>
      <ac-order-list class="ac-pick-list__column"
          onListChange={this.handleChangeAclistAvailableOptionsSelected}
          ref={acList => this.acListAvalibles = acList}
          searchLabel={this.searchLabel}
          label={this.availableLabel}
          options={this.options}
          no-results-label={this.noResultsLabel}
          multiple={true}>
          <slot />
        </ac-order-list>
        <section
          class="ac-pick-list__column ac-pick-list__action-panel ac-pick-list__action-panel--gutter">
          <div class="ac-pick-list__cell ac-pick-list__cell--align-start ac-pick-list__cell--dir-col">
            <ac-button
              disabled={this.numberAvailableOptionsSelected === 0}
              class="ac-pick-list__button"
              onClick={this.addSelectedOptions}>
              {this.addLabel}
              <AcFaIcon slot="icon-start"
                icon={faAngleDoubleRight}
                class={{
                  "ac-pick-list__button-icon": true,
                  "ac-pick-list__button-icon--disabled": this.numberAvailableOptionsSelected === 0
                 }}
                size={12}  />
            </ac-button>
            <ac-button
              disabled={disabledAddAll}
              class="ac-pick-list__button"
              fill="clear"
              theme="primary"
              onClick={this.addAllOptions}>
              {this.addAllLabel}
            </ac-button>
          </div>
          <div class="ac-pick-list__cell ac-pick-list__cell--align-end ac-pick-list__cell--dir-col">
            <ac-button
              class="ac-pick-list__button"
              disabled={this.numberOfSelectedOptions === 0}
              onClick={this.removeOptions}>
              {this.removeLabel}
              <AcFaIcon
                slot="icon-start"
                icon={faAngleDoubleLeft}
                class={{
                  "ac-pick-list__button-icon": true,
                  "ac-pick-list__button-icon--disabled": this.numberOfSelectedOptions === 0
                 }}
                 size={12}  />
            </ac-button>
            <ac-button
              disabled={disabledRemoveAll}
              fill="clear"
              theme="primary"
              class="ac-pick-list__button"
              onClick={this.removeAllOptions}>
              {this.removeAllLabel}
            </ac-button>
          </div>
        </section>
        <ac-order-list class="ac-pick-list__column"
          ref={acList => this.acListSelectedOptions = acList}
          onListChange={this.handleChangeAclistSelectedOptions}
          label={this.selectedLabel}
          multiple={true}
          searchLabel={this.searchLabel}>
        </ac-order-list>
    </Host>);
  }
}
