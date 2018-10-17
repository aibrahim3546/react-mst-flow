// @flow

import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, decorate, action } from 'mobx';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import type { RouterHistory, LocationShape } from 'react-router-dom';
import styled, { css } from 'styled-components';
import queryString from 'query-string';

import MovieCard from '../components/MovieCard';

type Props = {
  rootStore: Object,
  history: RouterHistory,
  location: LocationShape
};

type ObservableState = {
  isLoading: boolean,
  isUpcoming: boolean
};

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

class Movie extends Component<Props> {
  observableState: ObservableState = {
    isUpcoming: false,
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { rootStore, location } = this.props;
    const { list } = queryString.parse(location.search);
    console.log(list);

    if (list === 'upcoming') {
      this.observableState.isUpcoming = true;
    }

    rootStore.movieStore.fetchMovies(() => {
      this.observableState.isLoading = false;
      console.log('SUCESS');
    });
  };

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
