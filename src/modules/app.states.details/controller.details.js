/**
 * @memberOf app.states.details
 */
(function (module) {
  'use strict';

  function DetailsController($scope, movieData) {
    var controller = this;

    /**
     * Resolved movie data (see router state config in _details.js_).
     * @type {Object}
     */
    $scope.movieData = movieData;
  }

  module.controller('detailsController', [
    '$scope',
    'movieData',
    DetailsController
  ]);

}(angular.module('app.states.details')));
