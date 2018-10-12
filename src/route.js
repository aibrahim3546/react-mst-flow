import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import rootStore from './stores';
import App from './App';

import Home from './views/Home';
import Movie from './views/Movie';

import BottomNavBar from './components/BottomNavBar';

export default () => (
  <Provider rootStore={rootStore}>
  <App>
      <HashRouter>
        <Switch>
          <BottomNavBar>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movie}/>
          </BottomNavBar>
        </Switch>
      </HashRouter>
   </App>
  </Provider>
  
);