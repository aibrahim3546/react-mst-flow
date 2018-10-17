// @flow

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { decorate, observable, action } from 'mobx';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import MovieCard from '../components/MovieCard';

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

class MovieInfo extends Component<Props> {
  observableState: ObservableState = {
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {
      rootStore,
      match: { params }
    } = this.props;
    rootStore.movieStore.fetchMovie(
      {
        id: params.id
      },
      () => {
        setTimeout(() => {
          this.observableState.isLoading = false;
        }, 50);
      }
    );
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
