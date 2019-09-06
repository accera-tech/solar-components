import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { Component, Event, EventEmitter, Listen, Prop, Watch, h } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';
import { count } from '../../../utils/lang/count';
import { AcFaIcon } from '../../utils/ac-fa-icon';

@Component({
  tag: 'ac-pagination',
  styleUrl: 'ac-pagination.scss'
})

export class AcPagination {
  private skipPagesNext: HTMLDivElement;
  private skipPagesPrevious: HTMLDivElement;

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

  /**
   *  Event emitted when changed tab
   */
  @Event({ eventName: 'paginationChange' }) paginationChange: EventEmitter;

  @Listen('tabChange')
  handleChangePage(ev) {
    this.selected = parseInt(ev.detail);
    this.paginationChange.emit(this.selected);
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

  @Watch('totalPages')
  @Watch('selected')
  definePages() {
    if (this.selected === 1 && this.skipPagesPrevious) {
      this.skipPagesPrevious.classList.add('skip-pages__disable');
    } else if (this.skipPagesPrevious) {
      this.skipPagesPrevious.classList.remove('skip-pages__disable');
    }
    if (this.selected === this.totalPages && this.skipPagesNext) {
      this.skipPagesNext.classList.add('skip-pages__disable');
    } else if (this.skipPagesNext) {
      this.skipPagesNext.classList.remove('skip-pages__disable');

    }
  }

  render() {
    return [
      this.totalPages > 0 &&
      <ac-tabs selected={this.selected} compact>
        <div
          class="skip-pages skip-pages__disable"
          onClick={this.handleAfterPage}
          ref={skipPagesPrevious => this.skipPagesPrevious = skipPagesPrevious as HTMLDivElement}
        >
          <AcFaIcon class="skip-pages--icon" icon={faAngleLeft} size={12}/>
          <span>{this.previousLabel}</span>
        </div>
        {
          ...count(this.totalPages).map(i =>
            <ac-tab id={i + 1} compact>{i + 1}</ac-tab>
          )
        }
        <div class="skip-pages" ref={skipPagesNext => this.skipPagesNext = skipPagesNext as any}>
          <span onClick={this.handleNextPage}>{this.nextLabel}</span>
          <AcFaIcon class="skip-pages--icon" icon={faAngleRight} size={12}/>
        </div>
      </ac-tabs>
    ]
  }
}
