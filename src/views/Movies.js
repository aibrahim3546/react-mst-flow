import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, decorate, action } from 'mobx';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import moment from 'moment';

type Props = {
  rootStore: Object,
}

type ObservableState = {
  isLoading: boolean,
  isUpcoming: boolean,
}

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
  margin-left: ${props => props.isUpcoming ? '50%' : '0'};
`;

const MoviePoster = styled.div`
  /* height: ${window.screen.width / 2.5}; */
  height: 160px;
  width: 100%;
  background-image: url(${props => props.src});
  background-position:center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1px;
  box-shadow: 1px 1px 5px rgba(255,255,255,0.25);
`;

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

const MovieContainer = styled.div`
  margin-top: 120px;
  transition: All 0.15s;
  position: relative;
  ${props => (props.isUpcoming ? css`
    right: ${props => props.isLoading ? '-100%' : '0'};
  ` : css`
    left: ${props => props.isLoading ? '-100%' : '0'};
  `)}
  opacity: ${props => props.isLoading ? 0 : 1};
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

class Movie extends Component<Props> {
  observableState: ObservableState;
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { rootStore } = this.props;

    rootStore.movieStore.fetchMovies(() => {
      this.observableState.isLoading = false;
      console.log('SUCESS');
    });
  }

  observableState = {
    isUpcoming: false,
    isLoading: true,
  }

  onChangeTab = (isUpcoming) => {
    const { observableState } = this;
    if (observableState.isUpcoming !== isUpcoming) {
      this.observableState.isLoading = true;
      if (isUpcoming) {
        observableState.isUpcoming = true;
      } else {
        observableState.isUpcoming = false;
      }
      setTimeout(() => {
        this.observableState.isLoading = false;
      }, 150);
    }
  }

  renderMovies = (movies) => (
    movies.map(each => (
      <div key={each.id}>
        <Link to={`/movie/${each.id}`}>
          <MoviesContainer>
            <tbody>
              <tr>
                <td style={{ width: '35%' }}>
                  <MoviePoster src={each.posterUrl}/>
                </td>
                <td>
                  <InfoContainer>
                    <Title>{each.title}</Title>
                    <ReleaseDate>{moment(each.releaseDate).format('DD MMM YYYY')}</ReleaseDate>
                    <Rating>{each.rating}</Rating>
                    <Plot>{truncatePlot(each.overview, 100)}</Plot>
                  </InfoContainer>
                </td>
              </tr>
            </tbody>
          </MoviesContainer>
        </Link>
      </div>
    ))
  )

  render() {
    const { movieStore } = this.props.rootStore;
    const { topRatedMovies, upcomingMovies } = movieStore;
    const { isUpcoming, isLoading } = this.observableState;

    return (
      <Fragment>
        <div style={{ position: 'fixed', top: 0,  backgroundColor: '#000', width: '100%', zIndex: 10, padding: '0 20px', maxWidth: 480}}>
          <Label>
            Movies
          </Label>
          <div style={{ marginTop: 10 }}>
            <Button onClick={() => this.onChangeTab(false)}>
              Top Rated
            </Button>
            <Button onClick={() => this.onChangeTab(true)}>
              Upcoming
            </Button>
          </div>
          <Line isUpcoming={isUpcoming} />
        </div>
        <Container>

          <MovieContainer isLoading={isLoading} isUpcoming={isUpcoming}>
            {!isLoading &&
              <Fragment>
              {isUpcoming ?
                this.renderMovies(upcomingMovies) :
                this.renderMovies(topRatedMovies)
              }
              </Fragment>
            }
          </MovieContainer>

        </Container>
      </Fragment>
    );
  }
}

decorate(Movie, {
  observableState: observable,
  fetchData: action,
  onChangeTab: action,
  onClickMovie: action,
})

export default inject('rootStore')(observer(Movie));