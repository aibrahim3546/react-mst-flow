import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, decorate, action } from 'mobx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
  font-size: 30px;
  padding-top: 20px;
  font-weight: 500;
`;

const Button = styled.div`
  color: #fff;
  display: inline-block;
  font-size: 18px;
  width: 120px;
  text-align: center;
  font-weight: 500;
  padding-bottom: 8px;

  :active {
    color: #aaa;
  }
`;

const Line = styled.div`
  width: 120px;
  transition: all 0.25s;
  height: 1px;
  border: 3px solid #fff;
  border-radius: 3px;
  margin-left: ${props => props.isUpcoming ? '120px' : '0'};
  margin-bottom: 1px;
`;

const MoviePoster = styled.div`
  height: ${window.screen.width / 2.5};
  width: 100%;
  background-image: url(${props => props.src});
  background-position:center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.25);
  max-height: 160px;
`;

const MoviesContainer = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  transition: all 0.25s;
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
  box-shadow: 1px 1px 5px rgba(0,0,0,0.25);
  padding: 10px 15px;
  background-color: #fff;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 13px;
  padding-bottom: 10px;
  color: #222;
`;

const ReleaseDate = styled.div`
  color: #333;
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
  margin-top: 150px;
  transition: All 0.29s;
  position: relative;
  left: ${props => props.isLoading ? '-100%' : '0'};
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
      }, 200);
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
    const { isUpcoming, isLoading, isMovie, movie, index } = this.observableState;

    return (
      <Fragment>
        <div style={{ position: 'fixed', top: 0,  backgroundColor: '#000', width: '100%', zIndex: 10, padding: '0 20px', maxWidth: 480}}>
          <Label>
            {isUpcoming ?
              'Upcoming' : 'Top Rated'
            }
          </Label>
          <div style={{ paddingRight: 25, marginTop: 25 }}>
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

          <MovieContainer isLoading={isLoading}>
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