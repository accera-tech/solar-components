import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { h } from '@stencil/core';

import { AcFaIcon } from '../../../utils/ac-fa-icon';

import { TableCell } from './table-cell';

export const TableBody = props => {
  const tbodyReference = document.getElementById('tbodyReference');
  return (
    <tbody id="tbodyReference" class="table-content">
    {
      props.loading &&
      <div style={tbodyReference ? { width: `${tbodyReference.offsetWidth}px` } : null} class="table-body--loading">
        <AcFaIcon icon={faSpinner} size={20} anim="spin"/>
      </div>
    }
    {props.rows && props.rows.map(row =>
      <tr onClick={() => props.onSelect(row)}>
        {props.columns.map(cell =>
          <TableCell type={cell.type} value={row[cell.key]}/>
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
