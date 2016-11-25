/**
 * @module app.states.test
 */
(function (module) {
  'use strict';

  var STATE_TEST = 'states.test';

  function config($stateProvider) {
    $stateProvider.state(STATE_TEST, {
      data: { module: module, navBar: true },
      url: '/test',
      views: {
        'content-smartphone': {
          controller: 'testController as testController'
        }
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_TEST = STATE_TEST; }

  module.constant('STATE_TEST', STATE_TEST);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.test', ['app.states'])));
