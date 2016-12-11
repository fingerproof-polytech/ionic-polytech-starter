/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController(
    $scope,
    statesService,
    shakeService,
    popupService
  ) {
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
      statesService.searchMovies($scope.search.query).then(function (results) {
        // Then, if the call was successful, update `$scope.search.results`.
        $scope.search.results = results;
      });
    };

    /**
     * Show a popup for a random movie if none already open.
     */
    controller.discoverMovie = function () {
      if (popupService.isOpen()) { return; }
      statesService.discoverMovie().then(function (movie) {
        popupService.open(module, 'smartphone/popup.discover', movie);
      });
    };

    // When the view has been entered...
    $scope.$on('$ionicView.enter', function () {
      // Listen to device shakes which will call `controller.discoverMovie`.
      shakeService.listen(controller.discoverMovie);
    });

    // When the view has is being left...
    $scope.$on('$ionicView.leave', function () {
      // Stop listening to device shakes.
      shakeService.stopListening();
    });
  }

  module.controller('homeController', [
    '$scope',
    'statesService',
    'shakeService',
    'popupService',
    HomeController
  ]);

}(angular.module('app.states.home')));
