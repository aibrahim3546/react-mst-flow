// @flow

import { types } from 'mobx-state-tree';
import { get } from 'mobx';

const Movie = types
  .model('Movie', {
    id: 0,
    title: '',
    popularity: 0,
    poster_path: '',
  })
  .views(self => ({
    get posterUrl() {
      return `https://image.tmdb.org/t/p/w500${self.poster_path}`;
    }
  }));

export default Movie;
