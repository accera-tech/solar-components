import { Component, h, Host, Prop } from '@stencil/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AcFaIcon } from '../../utils/ac-fa-icon';

@Component({
  tag: 'ac-search'
})
export class AcSearch {

  @Prop() searchLabel: string;
  @Prop({ reflectToAttr: true }) value;
  @Prop() fetch: any;

  render() {
    return <Host>
       <ac-input-base
            class="ac-order-list__search-bar"
            type="text"
            placeholder={this.searchLabel}
            value={this.value}
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
    </Host>;
  }
}