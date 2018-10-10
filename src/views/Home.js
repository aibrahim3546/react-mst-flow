import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { action, decorate } from 'mobx';

type Props = {
  rootStore: Object,
}

class Home extends Component<Props> {
  componentDidMount() {
    const { rootStore } = this.props;

    rootStore.movieStore.fetchMovies();

  }

  render() {
    return (
      <React.Fragment>
      <div>
        Home
      </div>
        <div>
          <Link to="/movie">
            Movie Page
          </Link>
        </div>
        </React.Fragment>
    );
  }
}

decorate(Home, {
  setName: action,
})

export default inject('rootStore')(observer(Home));