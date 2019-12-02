import { Component, Prop, Host, h, State, Watch } from '@stencil/core';
import { ListOption } from '../../molecules/ac-list/ac-list';
import { Bind } from '../../../utils/lang/bind';

@Component({
  tag: 'ac-pick-list',
  styleUrl: 'ac-pick-list.scss'
})
export class AcPickList {
  private acListAvalibles: HTMLAcListElement;

  @Prop() options: ListOption[];

  @Prop() searchLabel: string;
  @Prop() noResultsLabel: string;
  @Prop() availableLabel: string;
  @Prop() selectedLabel: string;
  @Prop() addLabel: string = 'Add';
  @Prop() addAllLabel: string = 'Add all';
  @Prop() removeLabel: string = 'Remove';
  @Prop() removeAllLabel: string = 'Remove All';

  @State() selectedOptions: ListOption[]

  @Watch('options')
  handleUpdateOptions() {
    this.selectedOptions = this.options
      ? this.options.filter(x => x.selected)
      : [];
  }

  @Bind
  addSelectedItems() {
    if (this.acListAvalibles.options) {
      this.selectedOptions = this.acListAvalibles
          .options
          .filter(x => x.selected);
      this.acListAvalibles.options = this.acListAvalibles.options
        .filter(x => x.selected === false);
    }
  }

  render() {
    return (
    <Host>
      <ac-list class="ac-pick-list__column"
          ref={acList => this.acListAvalibles = acList}
          options={this.options}
          no-results-label={this.noResultsLabel}
          multiple={true}>
          <slot />
        </ac-list>
        <section class="ac-pick-list__column">
          <div>
            <ac-button onClick={this.addSelectedItems}>
              {this.addLabel}
            </ac-button>
            <ac-button>
              {this.addAllLabel}
            </ac-button>
          </div>
          <div>
            <ac-button>
              {this.removeLabel}
            </ac-button>
            <ac-button>
              {this.removeLabel}
            </ac-button>
          </div>
        </section>
        <ac-list class="ac-pick-list__column"
          label={this.selectedLabel}
          multiple={false}
          options={this.selectedOptions}>
        </ac-list>

    </Host>);
  }

}