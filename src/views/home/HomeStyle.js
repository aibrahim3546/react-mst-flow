import styled from 'styled-components';
import PortraitPoster from '../../components/PortraitPoster';

const Label = styled.div`
  color: #fff;
  font-size: 20px;
  padding-top: 10px;
  font-weight: 500;
  width: 75px;
  display: inline-block;
`;

const MoreCard = styled(PortraitPoster)`
  text-align: center;
  padding-top: 50%;
  font-weight: bold;
  background-color: #fff;
  color: #000;
`;

const BannerContainer = styled.div`
  transition: all 0.15s;
  position: relative;
  right: ${props => (props.isLoading ? '-100%' : '0')};
`;

const LandscapePoster = styled.div`
  width: 95%;
  height: ${window.screen.width / 1.8}px;
  max-height: 260px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.src});
  margin: 0 auto;
  border-radius: 1px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px 12.5px;
  font-size: 15px;
`;

const MoviesContainer = styled.div`
  margin-top: 30px;
  border-width: 1px 0;
  padding-bottom: 10px;
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  border-width: 0.5px 0;
`;

export {
  Label,
  MoreCard,
  BannerContainer,
  LandscapePoster,
  Title,
  MoviesContainer
};
