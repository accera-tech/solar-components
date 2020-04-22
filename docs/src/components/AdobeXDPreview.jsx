import React from 'react';
import styled from 'styled-components';

const StyledIFrame = styled('iframe')`
  height: 500px;
  border: 1px solid #E6E6E6;
  width: 100%;
  background: #FFFFFF;
`;

export function AdobeXDPreview(props) {
  return (
    <StyledIFrame src={props.url.replace('view', 'embed')} />
  );
}
