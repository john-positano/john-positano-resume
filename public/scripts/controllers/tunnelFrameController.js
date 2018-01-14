JohnPositanoResume.controller('tunnelFrameController', function ($rootScope, $scope, $log, $timeout, $interval, $document, tunnelRouterService, $window, $state, $controller) {
  var $ng = angular.element;
  $scope.$router = tunnelRouterService;
  window.$rootScope = $rootScope;
  window.$state = $state;
  window.$tunnelScope = $scope;

  $timeout(function () {
    $scope.$router.bindScope($scope);
    $scope
      .$router
      .loadTunnelViews(
        [
          {
            front: '/views/tunnelViews/webDevelopment/front.html',
            center: '/views/tunnelViews/webDevelopment/center.html',
            back: '/views/tunnelViews/webDevelopment/back.html'
          },
          {
            front: '/views/tunnelViews/softwareDevelopment/front.html',
            center:'/views/tunnelViews/softwareDevelopment/center.html',
            back: '/views/tunnelViews/softwareDevelopment/back.html'
          }
        ]
      );
    $ng($window).trigger('resize');
  });

  $ng($window).on('resize', function () {
    $scope.sizeUpFrame($ng($window).width(), $ng($window).height());
    $scope.camera.position.z = $rootScope.jFrameCamera.position.z;
    $scope.animate(); 
  });
  $rootScope.$on('scroll', function (_, $e, $s) { $scope.camera.position.z = $rootScope.jFrameCamera.position.z; $scope.animate(); });
});