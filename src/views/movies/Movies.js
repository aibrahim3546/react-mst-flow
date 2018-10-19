// @flow

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, decorate, action } from 'mobx';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import type { RouterHistory, LocationShape } from 'react-router-dom';
import queryString from 'query-string';

import {
  TopBarContainer,
  Line,
  Button,
  Label,
  Container,
  MovieContainer
} from './MoviesStyle';
import MovieCard from '../../components/MovieCard';

type Props = {
  rootStore: Object,
  history: RouterHistory,
  location: LocationShape
};

type ObservableState = {
  isLoading: boolean,
  isUpcoming: boolean
};

class Movie extends Component<Props> {
  observableState: ObservableState = {
    isUpcoming: false,
    isLoading: true
  };

  componentDidMount() {
    const { location } = this.props;
    const { list } = queryString.parse(location.search);

    if (list === 'upcoming') {
      this.observableState.isUpcoming = true;
    }
    setTimeout(() => {
      this.observableState.isLoading = false;
    }, 50);
  }

  onChangeTab = isUpcoming => {
    const { history } = this.props;
    const { observableState } = this;

    if (observableState.isUpcoming !== isUpcoming) {
      this.observableState.isLoading = true;
      if (isUpcoming) {
        observableState.isUpcoming = true;
        history.replace('/movies?list=upcoming');
      } else {
        observableState.isUpcoming = false;
        history.replace('/movies?list=popular');
      }
      setTimeout(() => {
        this.observableState.isLoading = false;
      }, 150);
    }
  };

  renderMovies = movies =>
    movies.map(each => (
      <Link to={`/movie/${each.id}`} key={each.id}>
        <MovieCard movie={each} isPlot />
      </Link>
    ));

  render() {
    const { movieStore } = this.props.rootStore;
    const { popularMovies, upcomingMovies } = movieStore;
    const { isUpcoming, isLoading } = this.observableState;

    return (
      <Fragment>
        <TopBarContainer>
          <Label>Movies</Label>
          <div style={{ marginTop: 10 }}>
            <Button onClick={() => this.onChangeTab(false)}>Popular</Button>
            <Button onClick={() => this.onChangeTab(true)}>Upcoming</Button>
          </div>
          <Line isUpcoming={isUpcoming} />
        </TopBarContainer>

        <Container>
          <MovieContainer isLoading={isLoading} isUpcoming={isUpcoming}>
            {!isLoading && (
              <Fragment>
                {isUpcoming
                  ? this.renderMovies(upcomingMovies)
                  : this.renderMovies(popularMovies)}
              </Fragment>
            )}
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
  onClickMovie: action
});

export default withRouter(inject('rootStore')(observer(Movie)));
