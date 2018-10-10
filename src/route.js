import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import rootStore from './stores';
import App from './App';

import Home from './views/Home';
import Movie from './views/Movie';

export default () => (
  <Provider rootStore={rootStore}>
  <App>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie" component={Movie}/>
        </Switch>
      </HashRouter>
   </App>
  </Provider>
  
);