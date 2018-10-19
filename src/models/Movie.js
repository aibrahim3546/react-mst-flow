// @flow

import { types } from 'mobx-state-tree';

const Movie = types
  .model('Movie', {
    id: 0,
    title: '',
    popularity: 0,
    poster_path: '',
    backdrop_path: '',
    overview: '',
    release_date: '',
    vote_average: 0
  })
  .views(self => ({
    get posterUrl() {
      return `https://image.tmdb.org/t/p/w500${self.poster_path}`;
    },
    get landscapePoster() {
      return `https://image.tmdb.org/t/p/w500${self.backdrop_path}`;
    },
    get releaseDate() {
      return self.release_date;
    },
    get rating() {
      return self.vote_average;
    }
  }));

export default Movie;
