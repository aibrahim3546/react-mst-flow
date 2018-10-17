import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import rootStore from './stores';
import App from './App';

import ScrollToTop from './ScrollToTop';

import Home from './views/Home';
import Movies from './views/Movies';
import MovieInfo from './views/MovieInfo';

import BottomNavBar from './components/BottomNavBar';

export default () => (
  <Provider rootStore={rootStore}>
    <App>
      <HashRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path="/movie/:id" component={MovieInfo} />
            <BottomNavBar>
              <Route exact path="/" component={Home} />
              <Route exact path="/movies" component={Movies} />
            </BottomNavBar>
          </Switch>
        </ScrollToTop>
      </HashRouter>
    </App>
  </Provider>
);
