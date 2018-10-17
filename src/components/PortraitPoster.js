import React from 'react';
import styled from 'styled-components';

const PortraitPoster = styled.div`
  width: ${props => props.width};
  height: ${props => props.height}px;
  max-height: ${props => props.maxWidth}px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});
  margin: 0 auto;
  border-radius: 1px;
`;

export default PortraitPoster;