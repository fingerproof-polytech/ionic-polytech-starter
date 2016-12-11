/**
 * @module app.states.details
 */
(function (module) {
  'use strict';

  var STATE_DETAILS = 'states.details';

  function movieDataResolver($stateParams, statesService) {
    // Call the `getMovie` method passing the "id" state paramter.
    return statesService.getMovie($stateParams.id);
  }

  function config($stateProvider) {
    $stateProvider.state(STATE_DETAILS, {
      data: { module: module, navBar: true },
      // Define an url dynamic fragment named "id" as state parameter.
      url: '/details/:id',
      views: {
        'content-smartphone': {
          controller: 'detailsController as detailsController'
        }
      },
      resolve: {
        // Resolve movie data before accessing the state.
        // The state won't be accessible if the resolving fails.
        movieData: ['$stateParams', 'statesService', movieDataResolver]
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_DETAILS = STATE_DETAILS; }

  module.constant('STATE_DETAILS', STATE_DETAILS);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.details', ['app.states'])));
