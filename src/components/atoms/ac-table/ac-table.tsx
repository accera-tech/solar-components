import { Component, Prop, Watch } from '@stencil/core';

import { sortArray } from '../../../utils/collections/sort-array';
import { Bind } from '../../../utils/lang/bind';

import { TableBody } from './children/table-body';
import { TableHeader } from './children/table-header';

@Component({
  tag: 'ac-table',
  styleUrl: 'ac-table.scss'
})

export class AcTable {
  @Prop({ mutable: true }) options: Options;

  @Prop({ mutable: true }) fetch: any;

  @Prop({ mutable: true }) params = {
    ordering: 'asc',
    property: {},
    filters: {
      limitRows: 10,
      totalRows: 158,
    }
  };

  @Watch('params')
  onParamsDidUpdate() {
    if (this.fetch) {
      this.update();
    } else {
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
  }

  @Bind
  async update() {
    const options = await this.fetch(this.params);
    this.options = ({
      ...this.options,
      rows: options.rows,
    });
  }

  @Bind
  selectRow(row) {
    console.log(row);
  }

  render() {
    return [
      <table class="table">
        <TableHeader columns={this.options.header} click={this.changeOrder} order={this.params}/>
        <TableBody
          rows={this.options.rows}
          columns={this.options.header}
          onSelect={this.selectRow}
        />
      </table>,
      <ac-pagination total-rows={this.params.filters.totalRows} limit-rows={this.params.filters.limitRows}/>
    ];
  }
}

export interface Options {
  header: [object],
  rows: [object]
}
