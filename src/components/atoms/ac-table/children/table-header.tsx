import { h } from '@stencil/core';

export const TableHeader = props => {
  return (
    <thead>
    <tr>
      {props.columns.map(header =>
        <th
          onClick={props.order ? props.click : () => {
          }}
          id={header.key}
        >
          <strong>{header.label}</strong>
          {props.order.property === header.key ?
            <span class={props.order ? `order-${props.order.ordering} order` : 'order'}>
                <i class="fas fa-arrow-up"></i>
          </span>
            : <span class="order-space-icon"><i class="fas fa-arrow-up "></i> </span>}
        </th>
      )}
    </tr>
    </thead>
  );
};
