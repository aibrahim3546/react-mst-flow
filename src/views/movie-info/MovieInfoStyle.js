import styled from 'styled-components';

const LandscapePoster = styled.div`
  width: 100%;
  height: ${window.screen.width / 1.8};
  max-height: 160px;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: All 0.15s;
  opacity: ${props => (props.isLoading ? 0 : 1)};
  position: relative;
`;

const Container = styled.div`
  padding: 10px 15px;
  margin-top: ${props => (props.isLoading ? '100%' : '-85px')};
  opacity: ${props => (props.isLoading ? 0 : 1)};
  position: relative;
  transition: all 0.15s;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: #888;
`;

const Plot = styled.div`
  color: #888;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  margin-top: 15px;
`;

export { LandscapePoster, Container, Label, Plot };
