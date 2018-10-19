import styled, { css } from 'styled-components';

const TopBarContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: #000;
  width: 100%;
  z-index: 10;
  padding: 0 20px;
  max-width: 480px;
`;

const Container = styled.div`
  padding: 0 20px 80px;
  position: relative;
  z-index: 2;
  height: 100%;
  width: 100%;
  max-width: 480px;
  overflow-x: hidden;
`;

const Label = styled.div`
  color: #fff;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 10px;
  font-weight: 500;
  width: 75px;
  display: inline-block;
`;

const Button = styled.div`
  color: #fff;
  display: inline-block;
  font-size: 15px;
  width: 50%;
  text-align: center;
  padding-bottom: 8px;

  :active {
    color: #aaa;
  }
`;

const Line = styled.div`
  width: 50%;
  transition: all 0.15s;
  height: 1px;
  border: 3px solid #fff;
  margin-left: ${props => (props.isUpcoming ? '50%' : '0')};
`;

const MovieContainer = styled.div`
  margin-top: 120px;
  transition: All 0.15s;
  position: relative;
  ${props =>
    props.isUpcoming
      ? css`
          right: ${props.isLoading ? '-100%' : '0'};
        `
      : css`
          left: ${props.isLoading ? '-100%' : '0'};
        `}
  opacity: ${props => (props.isLoading ? 0 : 1)};
`;

export { TopBarContainer, Container, Label, Button, Line, MovieContainer };
