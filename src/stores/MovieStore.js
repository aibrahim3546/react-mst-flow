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
        console.log(topResponse);
        console.log(upcomingResponse);
        onSuccess();
      }));
    },
    setMovies(topMovies, upcomingMovies) {
      self.topRatedMovies = topMovies.map(each => Movie.create(each));
      self.upcomingMovies = upcomingMovies.map(each => Movie.create(each));

      console.log(self.topRatedMovies);
      console.log(self.upcomingMovies);
    }
  }));


  function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));

export default MovieStore;