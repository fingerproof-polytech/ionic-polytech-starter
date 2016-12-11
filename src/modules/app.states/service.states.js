/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService(
    $q,
    httpService,
    i18nService,
    API_IMAGES_URL,
    API_KEY
  ) {
    var service = this;

    /**
     * Build a movie image url given a path and a width.
     * @param {String|null} path - Should be part a other TMDB API calls.
     * @param {Number} width - Valid image width.
     *   See https://developers.themoviedb.org/3/configuration.
     * @return {String|null}
     */
    service.getImageUrl = function (path, width) {
      return path && API_IMAGES_URL + '/t/p/w' + width + path;
    };

    /**
     * Get search results matching a given query.
     * @param {String} query
     * @return {Promise} Passing an array of results, may be empty.
     */
    service.searchMovies = function (query) {
      return httpService.get('/3/search/movie', {
        language: i18nService.getLocale(),
        api_key: API_KEY,
        query: query
      }).then(function (data) {
        return _.map(data.results, function (result) {
          result.poster = service.getImageUrl(result.poster_path, 185);
          return result;
        });
      });
    };

    /**
     * Get movie details for a given movie id.
     * @param {String} id
     * @return {Promise} Passing an object.
     */
    service.getMovie = function (id) {
      return httpService.get('/3/movie/' + id, {
        language: i18nService.getLocale(),
        api_key: API_KEY
      }).then(function (movie) {
        movie.backdrop = service.getImageUrl(movie.backdrop_path, 780);
        movie.poster = service.getImageUrl(movie.poster_path, 780);
        return movie;
      });
    };

    /**
     * Get details for a random movie to come.
     * @return {Promise} Passing an object.
     */
    service.discoverMovie = function () {
      return httpService.get('/3/discover/movie', {
        // Limit results (max) to the next three months
        'release_date.lte': moment().add(3, 'months').format('YYYY-MM-DD'),
        // Limit results (min) to today
        'release_date.gte': moment().format('YYYY-MM-DD'),
        language: i18nService.getLocale(),
        api_key: API_KEY
      }).then(function (data) {
        return _.sample(data.results) || $q.reject();
      });
    };

    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    '$q',
    'httpService',
    'i18nService',
    'API_IMAGES_URL',
    'API_KEY',
    StatesService
  ]);

}(angular.module('app.states')));
