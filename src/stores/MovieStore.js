// @flow

import { types, flow } from 'mobx-state-tree';
import axios from 'axios';
import Movie from '../models/Movie';
import { API_KEY } from '../../config';

const MovieStore = types
  .model('MovieStore', {
    popularMovies: types.optional(types.array(Movie), []),
    upcomingMovies: types.optional(types.array(Movie), []),
    movie: types.optional(Movie, {})
  })
  .actions(self => ({
    fetchPopularMoviess: flow(function* fetchPopularMoviess() {
      try {
        const response = yield axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        console.log(response);
      } catch (error) {
        console.warn(error);
      }
    }),
    fetchPopularMovies() {
      return axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
    },
    fetchUpcomingMovie() {
      return axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
    },
    fetchMovies(onSuccess = () => {}) {
      axios.all([self.fetchPopularMovies(), self.fetchUpcomingMovie()]).then(
        axios.spread((popularResponse, upcomingResponse) => {
          self.setMovies(
            popularResponse.data.results,
            upcomingResponse.data.results
          );
          onSuccess();
        })
      );
    },
    setMovies(popularMovies, upcomingMovies) {
      self.popularMovies = popularMovies.map(each => Movie.create(each));
      self.upcomingMovies = upcomingMovies.map(each => Movie.create(each));
    },
    fetchMovie(body = {}, onSuccess = () => {}) {
      const { id } = body;

      let i = self.popularMovies.find(each => each.id === Number(id));
      if (!i) {
        i = self.upcomingMovies.find(each => each.id === Number(id));
      }

      const movie = JSON.stringify(i);

      self.movie = Movie.create(JSON.parse(movie));
      onSuccess();
    }
  }));

export default MovieStore;
