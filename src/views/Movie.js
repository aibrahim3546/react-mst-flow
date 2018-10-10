import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

type Props = {
  rootStore: Object,
}

class Movie extends Component<Props> {
  componentDidMount() {

  }

  render() {
    const { authStore } = this.props.rootStore;
    return (
      <Fragment>
        <div>
          My Name is { authStore.name }
        </div>
        <div>
          <Link to="/">
            Home Page
          </Link>
        </div>
      </Fragment>
      
    );
  }
}

export default inject('rootStore')(observer(Movie));