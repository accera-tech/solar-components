import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { Component, Listen, Prop } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';
import { count } from '../../../utils/lang/count';

@Component({
  tag: 'ac-pagination',
  styleUrl: 'ac-pagination.scss'
})

export class AcPagination {

  /**
   * The amount of pages.
   */
  @Prop({ mutable: true }) totalPages: number;

  /**
   * The selected page.
   */
  @Prop({ mutable: true }) selected = 1;

  /**
   * Used to localize the Next button label.
   */
  @Prop() nextLabel = 'Next';

  /**
   * Used to localize the Previous button label.
   */
  @Prop() previousLabel = 'Previous';

  @Listen('tabChange')
  handleChangePage(ev) {
    this.selected = parseInt(ev.detail);
    console.log(this.selected)
  }

  @Bind
  handleNextPage() {
    if (this.selected < this.totalPages) {
      this.selected = this.selected + 1;
    }
  }

  @Bind
  handleAfterPage() {
    if (this.selected > 1) {
      this.selected = this.selected - 1;
    }
  }

  @Bind
  options() {

  }

  render() {
    return [
      <ac-tabs compact selected={this.selected}>
        <div onClick={this.handleAfterPage}>
          <ac-fa-icon icon={faAngleLeft} size={14}/>
          <span>{this.previousLabel}</span>
        </div>
        {
          ...count(this.totalPages).map(i =>
            <ac-tab id={i + 1}>{i + 1}</ac-tab>
          )
        }
        <div>
          <ac-fa-icon icon={faAngleLeft} size={14} />
          <span onClick={this.handleNextPage}>{this.nextLabel}</span>
        </div>
      </ac-tabs>,

    ]
  }
}
