// @flow

import { types } from 'mobx-state-tree';
import Movie from '../models/Movie';
import axios from 'axios';
import http from '../utils/http';
import { API_KEY } from '../../config';

const MovieStore = types
  .model('MovieStore', {
    topRatedMovies: types.optional(types.array(Movie), []),
    upcomingMovies: types.optional(types.array(Movie), []),
    movie: types.optional(Movie, {}),
  })
  .actions(self => ({
    fetchMoviesTopRatedMovies() {
      return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    },
    fetchUpcomingMovie() {
      return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
    },
    fetchMovies(onSuccess = () => {}, onError = () => {}) {
      axios.all([self.fetchMoviesTopRatedMovies(), self.fetchUpcomingMovie()])
      .then(axios.spread((topResponse, upcomingResponse) => {
        self.setMovies(topResponse.data.results, upcomingResponse.data.results);
        onSuccess();
      }));
    },
    setMovies(topMovies, upcomingMovies) {
      self.topRatedMovies = topMovies.map(each => Movie.create(each));
      self.upcomingMovies = upcomingMovies.map(each => Movie.create(each));
    },
    fetchMovie(body = {}, onSuccess = () => {}, onError = () => {}) {
      const { id } = body;

      let i = self.topRatedMovies.find(each => each.id === Number(id));
      if (!i) {
        i = self.upcomingMovies.find(each => each.id === Number(id));
      }

      const movie = JSON.stringify(i);

      self.movie = Movie.create(JSON.parse(movie));
      onSuccess();
    }
  }));

export default MovieStore;