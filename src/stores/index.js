// @flow

import { types } from 'mobx-state-tree';
import MovieStore from './MovieStore';

const RootStore = types
  .model('RootStore', {
    movieStore: types.optional(MovieStore, {}),
  });

const rootStore = RootStore.create({});

export default rootStore;