// @flow

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';


type Props = {
  history: RouterHistory,
  children: React.Node,
};


class ScrollToTop extends React.Component<Props> {
  componentDidMount() { }

  componentDidUpdate() {
    // WILL START FROM THE TOP OF THE PAGE EVERYTIME WHEN CHANGE THE ROUTE
    if (this.props.history.action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
