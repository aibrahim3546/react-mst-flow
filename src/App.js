// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { inject, observer } from 'mobx-react';
import { observable, decorate } from 'mobx';
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
    const { rootStore } = this.props;
    rootStore.movieStore.fetchMovies(() => {
      setTimeout(() => {
        this.observableState.isLoading = false;
      }, 4000);
    });

    rootStore.movieStore.fetchPopularMoviess(() => {
      // setTimeout(() => {
      //   // this.observableState.isLoading = false;
      // }, 4000);
    });
  }

  render() {
    const { isLoading } = this.observableState;
    return <div>{isLoading ? <Loader /> : this.props.children}</div>;
  }
}

decorate(App, {
  observableState: observable
});

export default inject('rootStore')(observer(App));
