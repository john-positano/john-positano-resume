JohnPositanoResume.controller('jFrameRingController', function ($rootScope, $scope, $log, $timeout, $interval, $document) {
  $timeout(
    function () {
      for (var ring in $scope.rings) {
        $scope.rings[ring].setSpin();
        $scope.scene.add($scope.rings[ring].ringGroup);
      }
    }
  );
});