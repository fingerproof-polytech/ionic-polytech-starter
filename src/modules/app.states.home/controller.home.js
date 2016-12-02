/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope, statesService) {
    var controller = this;

    /**
     * Search model object storing query and results.
     * @type {Object}
     */
    $scope.search = { query: '', results: [] };

    /**
     * Search for movies matching the `$scope.search.query` value.
     */
    controller.search = function () {
      // Use `statesService.search` which makes an asynchronous
      // call to the TMDB API and returns a promise...
      statesService.search($scope.search.query).then(function (results) {
        // Then, if the call was successful, update `$scope.search.results`.
        $scope.search.results = results;
      });
    };
  }

  module.controller('homeController', [
    '$scope',
    'statesService',
    HomeController
  ]);

}(angular.module('app.states.home')));
