import { Component, Event, EventEmitter, Prop, Watch, h, Method } from '@stencil/core';

import { sortArray } from '../../../utils/collections/sort-array';
import { Bind } from '../../../utils/lang/bind';

import { TableBody } from './children/table-body';
import { TableHeader } from './children/table-header';

@Component({
  tag: 'ac-table',
  styleUrl: 'ac-table.scss'
})
export class AcTable {
  /*
  * Event to be issued when there is a change in orders.
  */
  @Event({ eventName: 'changeOrder' }) change: EventEmitter;

  /*
  * Emit event when table update
  */
  @Event({ eventName: 'tableChange' }) tableChange: EventEmitter;
  /*
  *  Header and Rows, can be modified directly or using the fetch method.
  */
  @Prop({ mutable: true }) options: Options;
  /*
  *  The fetch method is a callback that should return options.
  */
  @Prop({ mutable: true }) fetch: any;
  /*
  * The selectRow is callback with row, use for actions with row.
  */
  @Prop({ mutable: true }) selectRow: any;
  /*
  * Table has skeleton, but use loading after you have already set the Header.
  */
  @Prop({ mutable: true }) loading: boolean;
  /*
  * label for results not found.
  */
  @Prop({ mutable: true }) noResultsLabel: string;
  /*
  * When the parameters are changed and there is a fetch method, a new request is triggered.
  */
  @Prop({ mutable: true }) params = {
    ordering: 'asc',
    property: '',
    selected: 1,
    filters: {
      limitRows: '',
      totalRows: '',
      search: ''
    }
  };

  @Watch('params')
  onParamsDidUpdate() {
    if (this.fetch) {
      this.update();
    } else if (!this.fetch && this.options) {
      this.options = {
        ...this.options,
        rows: sortArray(this.options.rows, this.params.ordering, this.params.property)
      }
    }
  }

  @Bind
  changeOrder(ev) {
    this.params = {
      ...this.params,
      property: ev.target.id,
      ordering: this.params.ordering === 'asc' ? 'desc' : 'asc',
    };
    this.change.emit();
  }

  @Bind
  @Method()
  async update() {
    this.fetch(this.params)
      .then(rows => {
        this.options = ({
          ...this.options,
          rows: rows.rows
        });
        this.tableChange.emit();
      })
      .catch(() => {
        this.options = ({
          ...this.options,
          rows: null
        })
      });
  }

  @Watch('fetch')
  onAddFetch() {
    this.update();
  }

  componentDidLoad() {
    if (this.fetch) {
      this.update();
    }
  }

  render() {
    return [
      this.options &&
      <table class="table">
        <TableHeader columns={this.options ? this.options.header : null} click={this.changeOrder} order={this.params}/>
        <TableBody
          rows={this.options.rows}
          columns={this.options.header}
          onSelect={this.selectRow}
          noResultsLabel={this.noResultsLabel}
          loading={this.loading}
        />
      </table>
    ];
  }
}

export interface Options {
  header: [object],
  rows: [object]
}
