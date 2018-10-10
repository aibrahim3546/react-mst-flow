// @flow

import { types } from 'mobx-state-tree';
import AuthStore from './AuthStore';

const RootStore = types
  .model('RootStore', {
    authStore: types.optional(AuthStore, {}),
  });

const rootStore = RootStore.create({});

export default rootStore;