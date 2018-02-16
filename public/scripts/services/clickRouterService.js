JohnPositanoResume.service('clickRouterService', function ($document, $timeout, $log) {
  var self = this,
      $ng = angular.element;

  self.routeFrame = function ($frame) {
    $frame
      .on(
        'vclick', 
        self.dispatchDelayedFocus
      );
  };

  self.dispatchDelayedFocus = function ($e) {
    $timeout(function () { $($e.target).focus(); }, 500);
  };

  return {
    routeFrame: self.routeFrame,
    $current: self.$current
  };
});