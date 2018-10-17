import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import PortraitPoster from './PortraitPoster';

const MoviesContainer = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  transition: all 0.15s;
  opacity: ${props => props.isMovie && !props.isId ? 0 : 1};
  margin-top: ${props => props.isId ? `-${props.marginTop}` : `20px`};
  td {
    padding: 0;
  }
`;

const InfoContainer = styled.div`
  border-radius: 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 1px 1px 5px rgba(255,255,255,0.25);
  padding: 10px 15px;
  background-color: ${props => !props.isPlot && '#fff'};
  color: ${props => !props.isPlot && '#000'};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 13px;
  padding-bottom: 10px;
`;

const ReleaseDate = styled.div`
  font-size: 11px;
  padding-bottom: 10px;
`;

const Rating = styled.div`
  color: #FFD700;
  font-size: 12px;
  padding-bottom: 10px;
  font-weight: 500;
`;

const Plot = styled.div`
  color: #888;
  font-size: 10px;
`;

const truncatePlot = function(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const MovieCard = ({ movie, isPlot }) => (
  <div key={movie.id}>
      <MoviesContainer>
        <tbody>
          <tr>
            <td style={{ width: '35%' }}>
              <PortraitPoster
                src={movie.posterUrl}
                maxWidth={160}
                height={160}
                width="100%"
              />
            </td>
            <td>
              <InfoContainer isPlot={isPlot}>
                <Title>{movie.title}</Title>
                <ReleaseDate>
                  {moment(movie.releaseDate).format('DD MMM YYYY')}
                </ReleaseDate>
                <Rating>{movie.rating}</Rating>
                {isPlot &&
                  <Plot>{truncatePlot(movie.overview, 100)}</Plot>
                }
              </InfoContainer>
            </td>
          </tr>
        </tbody>
      </MoviesContainer>
  </div>
);

export default MovieCard;