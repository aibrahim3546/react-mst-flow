// @flow

import { types } from 'mobx-state-tree';

const Actors = types.model('Actors', {
  character: types.optional(types.string, ''),
  imageUrl: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
});

const Movie = types.model('Movie', {
  key: types.optional(types.string, ''),
  title: types.optional(types.string, ''),
  censorRating: types.optional(types.string, ''),
  plot: types.optional(types.string, ''),
  trailerUrl: types.optional(types.string, ''),
  portraitPosterUrl: types.optional(types.string, ''),
  landscapePosterUrl: types.optional(types.string, ''),
  language: types.optional(types.string, ''),
  originalLanguage: types.optional(types.string, ''),
  actors: types.optional(types.array(Actors), []),
  popularity: types.optional(types.number, 0),
  isCustom: types.optional(types.boolean, false),
  releaseAt: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  runningTime: types.optional(types.number, 1),
  createdAt: types.optional(types.string, ''),
});

export default Movie;
