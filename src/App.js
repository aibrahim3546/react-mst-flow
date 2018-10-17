// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, decorate, action } from 'mobx';
import Loader from './components/Loader';

type Props = {
  children: Node,
  rootStore: Object
};

type ObservableState = {
  isLoading: boolean
};

class App extends Component<Props> {
  observableState: ObservableState = {
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {
      rootStore: { movieStore }
    } = this.props;

    await movieStore.fetchPopularMovies({
      body: {},
      success: () => {},
      error: () => {
        this.observableState.isLoading = false;
      }
    });
    movieStore.fetchUpcomingMovies({
      body: {},
      success: () => {
        setTimeout(() => {
          this.observableState.isLoading = false;
        }, 4000);
      },
      error: () => {
        this.observableState.isLoading = false;
      }
    });
  };

  render() {
    const { isLoading } = this.observableState;
    return <div>{isLoading ? <Loader /> : this.props.children}</div>;
  }
}

decorate(App, {
  observableState: observable,
  fetchData: action
});

export default inject('rootStore')(observer(App));
