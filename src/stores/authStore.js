// @flow

import { types } from 'mobx-state-tree';
// import User from '../models/User';
import Movie from '../models/Movie';

const AuthStore = types
  .model('AuthStore', {
    // user: types.optional(User, {}),
    movies: types.optional(types.array(Movie), []),
    name: '',
  })
  .actions(self => ({
    setName(name) {
      self.name = name;
    }
  }));

export default AuthStore;