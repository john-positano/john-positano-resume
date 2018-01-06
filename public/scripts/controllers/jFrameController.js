JohnPositanoResume.controller('jFrameController', function ($rootScope, $scope, $log, $timeout, $interval) {
	window.$scope = $scope;
  $scope.rings = [];

	$scope.loadMesh = function (url, callback) {
		var loader = new THREE.JSONLoader();
		loader.load(url, callback);
	};

	$scope.createRing = function () {
		return {
			ringFragments: []
		};
	};

  $scope.pushRing = function () { $scope.rings.push($scope.createRing()); };

  $scope.ringCanAcceptFragment = function (ring) { return ring.ringFragments.length < 6; };

  $scope.pushRingFragment = function (ringFragment) {
    $scope.rings.length || $scope.pushRing();

    for (var ring in $scope.rings) {
      if ($scope.ringCanAcceptFragment($scope.rings[ring])) {
      	ringFragment.$$parent = $scope.rings[ring];
        $scope.rings[ring].ringFragments.push(ringFragment);
      }
    }
  };

  $scope.$on('jFrameSetupComplete', function () {
    $scope.camera.position.z = 10;
    $scope.animate();
  });
});