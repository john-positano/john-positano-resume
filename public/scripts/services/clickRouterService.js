JohnPositanoResume.service('clickRouterService', function ($document, $timeout, $log) {
  var self = this,
      $ng = angular.element;

      console.log('clickRouterService called');

  self.routeFrame = function ($frame) {
    console.log('self.routeFrame');
    $frame
      .on(
        'vclick', 
        self.dispatchDelayedFocus
      );
  };

  self.dispatchDelayedFocus = function ($e) {
    console.log('iframe vclick', $e);
    $timeout(function () { $($e.target).focus(); }, 500);
  };

  $document.on('vclick click', function ($e) { console.log('document vclick click', $e); });

  return {
    routeFrame: self.routeFrame,
    $current: self.$current
  };
});