// @flow

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router';

import { LandscapePoster, Container, Label, Plot } from './MovieInfoStyle';
import MovieCard from '../../components/MovieCard';

type Props = {
  rootStore: Object,
  match: {
    params: {
      id: string
    }
  }
};

type ObservableState = {
  isLoading: boolean
};

class MovieInfo extends Component<Props> {
  observableState: ObservableState = {
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {
      rootStore: { movieStore },
      match: { params }
    } = this.props;
    movieStore.fetchMovie(params.id);
    setTimeout(() => {
      this.observableState.isLoading = false;
    }, 50);
  };

  render() {
    const {
      rootStore: { movieStore }
    } = this.props;
    const { movie } = movieStore;
    const { isLoading } = this.observableState;
    return (
      <div style={{ overflow: 'hidden' }}>
        <LandscapePoster src={movie.landscapePoster} isLoading={isLoading} />

        <Container isLoading={isLoading}>
          <MovieCard movie={movie} isPlot={false} />

          <div
            style={{
              marginTop: 30,
              padding: '10px 15px',
              boxShadow: '1px 1px 10px rgba(0,0,0,0.1)',
              borderRadius: 1
            }}
          >
            <Label>Overview</Label>
            <Plot>{movie.overview}</Plot>
          </div>
        </Container>
      </div>
    );
  }
}

decorate(MovieInfo, {
  observableState: observable,
  fetchData: action
});

export default withRouter(inject('rootStore')(observer(MovieInfo)));
