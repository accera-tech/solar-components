import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { Component, Event, EventEmitter, Listen, Prop, Watch, h, State, Element } from '@stencil/core';

import { Bind } from '../../../utils/lang/bind';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'ac-pagination',
  styleUrl: 'ac-pagination.scss'
})

export class AcPagination {
  private skipPagesNext: HTMLDivElement;
  private skipPagesPrevious: HTMLDivElement;
  

  @Element() host: HTMLElement;

  @State() showPageEditor = false;
  @State() pageCount = [ 1, 2, 3 ,4 , 5 ];

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
    this.updatePageCount();
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
  componentDidUpdate() {
    const tabs = this.host.querySelector('ac-tabs');
    if (tabs) {
      tabs.selected = this.selected;
    }
  }

  render() {
    return [
      this.totalPages > 0 &&
      <ac-tabs compact>
        <div
          class="skip-pages skip-pages__disable"
          onClick={this.handleAfterPage}
          ref={skipPagesPrevious => this.skipPagesPrevious = skipPagesPrevious as HTMLDivElement}
        >
          <AcFaIcon class="skip-pages--icon" icon={faAngleLeft} size={12}/>
          <span>{this.previousLabel}</span>
        </div>
        {this.pageCount.map(this.renderAcTabWithPageNumber)}
        {this.totalPages > 5 &&
          <div class={{'page-counter__container': true, 'page-counter__container--expand': this.showPageEditor }} >
            {this.showPageEditor
                ? <ac-input-base
                      size="small"
                      type="number"
                      step={1}
                      onBlur={(this.goTo)}
                      value={this.selected}
                    > 
                  </ac-input-base>
                : <AcFaIcon class="page-counter__container--icon" 
                            icon={faEllipsisH} 
                            size={12} 
                            onClick={this.showFocusGoToInput} />
            }
          </div>
        }
        {this.renderAcTabWithPageNumber(this.totalPages)}
        <div class="skip-pages" ref={skipPagesNext => this.skipPagesNext = skipPagesNext as any}>
          <span onClick={this.handleNextPage}>{this.nextLabel}</span>
          <AcFaIcon class="skip-pages--icon" icon={faAngleRight} size={12}/>
        </div>
      </ac-tabs>
    ]
  }

  @Bind
  showFocusGoToInput() {
    this.showPageEditor = true;
  }

  @Bind
  private goTo(evt) {
    const pageNumber: number = parseInt(evt.target.value);
    this.showPageEditor = false;
    if (pageNumber > this.totalPages || pageNumber < 1) {
      return;
    }
    this.selected = pageNumber;
  }

  private renderAcTabWithPageNumber(number: number) {
    return <ac-tab id={number.toString()} compact>{number}</ac-tab>
  }

  private updatePageCount() {
    if (this.selected <= 5) {
      this.pageCount = [1,2,3,4,5];
    } else {
      const pageNumber = this.selected === this.totalPages
        ? this.selected - 1
        : this.selected;
      this.pageCount = this.pageCount.map(x => x + (pageNumber - this.pageCount[this.pageCount.length -1]))
    }
  }
}
