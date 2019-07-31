import { TableCell } from './table-cell';

export const TableBody = props => {
  return (
    <tbody class="table-content">
    {props.rows && props.rows.map(row =>
        <tr>
          {props.columns.map(cell =>
            <TableCell type={cell.type} value={row[cell.key]} />
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
