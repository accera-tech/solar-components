import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { h } from '@stencil/core';

import { AcFaIcon } from '../../../utils/ac-fa-icon';

import { TableCell } from './table-cell';

export const TableBody = props => {
  return (
    <tbody>
    {
      props.loading &&
      <div class="table--loading">
        <AcFaIcon icon={faSpinner} size={20} anim="spin"/>
      </div>
    }
    {props.rows && props.rows.map(row =>
      <tr>
        {props.columns.map(cell =>
          <TableCell
            type={cell.type}
            value={row[cell.key]}
            onClick={() => props.onSelect && cell.type !== 'action' ? props.onSelect(row) : null}
          />
        )}
      </tr>,
    )}
    {
      (!props.rows || props.rows.length === 0) ?
        <tr>
          <td colSpan={props.columns.length}>{props.noResultsLabel || 'No Results Found.'}</td>
        </tr> : null
    }
    </tbody>
  );
};
