// @flow

import { types, flow } from 'mobx-state-tree';
import axios from 'axios';
import Movie from '../models/Movie';
import { API_KEY } from '../config';

const url = endpoint =>
  `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}`;

const MovieStore = types
  .model('MovieStore', {
    popularMovies: types.optional(types.array(Movie), []),
    upcomingMovies: types.optional(types.array(Movie), []),
    movie: types.optional(Movie, {})
  })
  .actions(self => ({
    fetchPopularMovies: flow(function* fetchPopularMovies(req) {
      try {
        const response = yield axios.get(url('popular'), req.body);
        const {
          data: { results }
        } = response;
        self.popularMovies = results.map(each => Movie.create(each));
        req.success();
        console.log(response);
      } catch (error) {
        console.warn(error);
        req.error();
      }
    }),
    fetchUpcomingMovies: flow(function* fetchUpcomingMovies(req) {
      try {
        const response = yield axios.get(url('upcoming'), req.body);
        const {
          data: { results }
        } = response;
        self.upcomingMovies = results.map(each => Movie.create(each));
        req.success();
        console.log(response);
      } catch (error) {
        console.warn(error);
        req.error();
      }
    }),
    fetchMovie(id) {
      let i = self.popularMovies.find(each => each.id === Number(id));
      if (!i) {
        i = self.upcomingMovies.find(each => each.id === Number(id));
      }
      // mobx-state-tree will throw error if you dont stringify the object
      const movie = JSON.stringify(i);
      self.movie = Movie.create(JSON.parse(movie));
    }
  }));

export default MovieStore;
