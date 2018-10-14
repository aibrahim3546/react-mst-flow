import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 100px;
  width: 100px;
  position: fixed;
  
`;

const Bar = styled.div`
  /* height: 20px; */
  border: 2px solid #000;
  background-color: #000;
  animation: rotate 1s infinite alternate;
  transform-origin: 0% 100%;
  font-weight: 500;
  color: #fff;
  text-align: center;

  @keyframes rotate {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(-15deg); }
  }
`;

const Box = styled.div`
  text-align: center;
  border: 2px solid #000;
  font-size: 20px;
  padding: 0.25px;
  color: #fff;
  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
`;

const Label = styled.div`
  background-color: #000;
  padding: 15px 0 25px;
  font-weight:  bold;
  /* border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px; */
`;

const Dots = styled.span`
  animation: opacity 1s infinite alternate;

  @keyframes opacity {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;


class Loader extends Component {
  componentDidMount() {

  }
  
  render() {
    return (
      <Container>
        <Bar>
          Loading...
          </Bar>
        <Box>
          <Label>
            <Dots>
              . . . .
            </Dots>
          </Label>
        </Box>
      </Container>
    );
  }
}

export default Loader;
