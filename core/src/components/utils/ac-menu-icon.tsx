import { h } from '@stencil/core';

export const AcMenuIcon = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" {...props}>
    <g transform="translate(-16 -15)">
      <rect width="16" height="3" rx="1.5" transform="translate(16 15)"/>
      <rect width="20" height="3" rx="1.5" transform="translate(16 21)"/>
      <rect width="12" height="3" rx="1.5" transform="translate(16 27)"/>
    </g>
  </svg>
);
