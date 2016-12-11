/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q, httpService, i18nService) {
    var service = this;

    /**
     * Build a movie image url given a path and a width.
     * @param {String|null} path - Should be part a other TMDB API calls.
     * @param {Number} width - Valid image width.
     *   See https://developers.themoviedb.org/3/configuration.
     * @return {String|null}
     */
    service.getImageUrl = function (path, width) {
      return path && 'http://image.tmdb.org/t/p/w' + width + path;
    };

    /**
     * Get search results matching a given query.
     * @param {String} query
     * @return {Promise} Passing an array of results, may be empty.
     */
    service.search = function (query) {
      // Mock TMDB API call using `$q` to return a resolved promise.
      return $q.resolve([{
        id: 1,
        title: query + ' 1',
        poster_path: '/cezWGskPY5x7GaglTTRN4Fugfb8.jpg',
        overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \'fight clubs\' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.'
      }, {
        id: 2,
        title: query + ' 2',
        poster_path: '/cezWGskPY5x7GaglTTRN4Fugfb8.jpg',
        overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \'fight clubs\' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.'
      }]).then(function (results) {
        return _.map(results, function (result) {
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
      // Mock TMDB API call using `$q` to return a resolved promise.
      return $q.resolve({
        backdrop_path: '/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg',
        budget: 63000000,
        id: id,
        overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \'fight clubs\' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        poster_path: '/cezWGskPY5x7GaglTTRN4Fugfb8.jpg',
        release_date: '1999-10-12',
        revenue: 100853753,
        title: 'Fight Club',
        vote_average: 7.8,
        vote_count: 3439
      }).then(function (movie) {
        movie.backdrop = service.getImageUrl(movie.backdrop_path, 780);
        movie.poster = service.getImageUrl(movie.poster_path, 780);
        return movie;
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
    StatesService
  ]);

}(angular.module('app.states')));
