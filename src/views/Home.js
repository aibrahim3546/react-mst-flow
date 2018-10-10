import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { action, decorate } from 'mobx';

type Props = {
  rootStore: Object,
}

class Home extends Component<Props> {
  componentDidMount() {

  }

  setName = () => {
    const { rootStore } = this.props;
    rootStore.authStore.setName('Ibrahim');
  }

  render() {
    const { authStore } = this.props.rootStore;
    return (
      <React.Fragment>
      <div>
        Home
      </div>
       <button onClick={this.setName}>
          Add Name here
        </button>
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