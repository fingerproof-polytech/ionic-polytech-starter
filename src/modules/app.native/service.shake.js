/**
 * memberOf app.native
 */
(function (module) {
  'use strict';

  function ShakeService($q, $window, cordovaUtils) {
    var service = this;

    /**
     * Listen to device shakes.
     * Based on https://github.com/leecrossley/cordova-plugin-shake.
     * @param {Function} callback - To be called when a shake happens.
     * @return {Promise} Never resolved but can be rejected with an error.
     */
    service.listen = cordovaUtils.whenReady(function (callback) {
      var deferred = $q.defer();
      $window.shake.startWatch(callback, null, deferred.reject);
      return deferred.promise;
    });

    /**
     * Stop listening to device shakes.
     * Based on https://github.com/leecrossley/cordova-plugin-shake.
     * @return {Promise} Resolved with `true`.
     */
    service.stopListening = cordovaUtils.whenReady(function () {
      $window.shake.stopWatch();
      return true;
    });
  }

  module.service('shakeService', [
    '$q',
    '$window',
    'cordovaUtils',
    ShakeService
  ]);

}(angular.module('app.native')));
