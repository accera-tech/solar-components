import { Component, Prop, Host, h, State, Method, Element } from '@stencil/core';
import { ListOption, AcList } from '../../molecules/ac-list/ac-list';
import { Bind } from '../../../utils/lang/bind';
import dragula from 'dragula';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  tag: 'ac-pick-list',
  styleUrl: 'ac-pick-list.scss'
})
export class AcPickList {
  private acListAvalibles: HTMLAcListElement;
  private acListSelectedOptions: HTMLAcListElement;


  @Element() host: HTMLAcPickListElement;

  @State() numberAvailableOptionsSelected = 0;
  @State() numberOfSelectedOptions = 0;

  @Prop() options: ListOption[];

  @Prop() searchLabel: string = 'Search';
  @Prop() noResultsLabel: string;
  @Prop() availableLabel: string;
  @Prop() selectedLabel: string;
  @Prop() addLabel: string = 'Add';
  @Prop() addAllLabel: string = 'Add all';
  @Prop() removeLabel: string = 'Remove';
  @Prop() removeAllLabel: string = 'Remove All';

  /**
   * Return the selected items.
   */
  @Method()
  getSelectedOptions() {
    return Promise.resolve(this.acListSelectedOptions.options);
  }

  @Bind
  addAllOptions() {
    if (this.acListAvalibles.options) {
      this.acListSelectedOptions.options = [
        ...this.acListAvalibles.options
      ];
      this.acListAvalibles.options = [];
    }
  }

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

  @Bind
  removeAllOptions() {
    this.acListAvalibles.options = [
      ...this.acListAvalibles.options,
      ...this.acListSelectedOptions.options
    ];
    this.acListSelectedOptions.options = [];
  }

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

  @Bind
  handleChangeAclistSelectedOptions(event: CustomEvent<AcList>) {
    if(event.detail) {
      event.detail.getSelectedOptions()
      .then(({length}) => this.numberOfSelectedOptions = length);
    } else {
      this.numberOfSelectedOptions = 0;
    }
  }

  @Bind
  handleChangeAclistAvailableOptionsSelected(event: CustomEvent<AcList>) {
    if(event.detail) {
      event.detail.getSelectedOptions()
      .then(({length}) => this.numberAvailableOptionsSelected = length);
    } else {
      this.numberAvailableOptionsSelected = 0;
    }
  }

  componentDidRender() {
    const drake = dragula([this.acListAvalibles.querySelector('.ac-list__list'), this.acListSelectedOptions.querySelector('.ac-list__list')], {
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
      <ac-list class="ac-pick-list__column"
          onListChange={this.handleChangeAclistAvailableOptionsSelected}
          ref={acList => this.acListAvalibles = acList}
          searchLabel={this.searchLabel}
          label={this.availableLabel}
          options={this.options}
          no-results-label={this.noResultsLabel}
          multiple={true}>
          <slot />
        </ac-list>
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
        <ac-list class="ac-pick-list__column"
          ref={acList => this.acListSelectedOptions = acList}
          onListChange={this.handleChangeAclistSelectedOptions}
          label={this.selectedLabel}
          multiple={true}
          searchLabel={this.searchLabel}>
        </ac-list>
    </Host>);
  }
}
