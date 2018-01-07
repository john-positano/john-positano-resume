JohnPositanoResume.controller('jFrameController', function ($rootScope, $scope, $log, $timeout, $interval, $document) {
	window.$scope = $scope;
  $scope.rings = [];

	$scope.loadMesh = function (url, callback) {
		var loader = new THREE.JSONLoader();
		loader.load(url, callback);
	};

	$scope.loadObject = function (url, callback) {
		var loader = new THREE.ObjectLoader();
		loader.load(url, callback);
	};

	$scope.loadFont = function (url, callback) {
		var loader = new THREE.FontLoader();
		loader.load(url, callback);
	};

	$scope.createRing = function () {
		var ring = {
			ringNumber: $scope.rings.length + 1,
			ringFragments: [],
			ringGroup: (new THREE.Object3D()),
			addRingFragmentToRingGroup: function (ringFragment) {
				ring.ringGroup.add(ringFragment);
			},
			setSpin: function () {
				ring.ringGroup.rotation.z += ((Math.PI + (Math.random() * 20)) / 12);
				$interval(
					function () {
						ring.ringGroup.rotation.z += (Math.PI / 1000 * Math.random());
					},
					5
				);
			}
		};
		return ring;
	};

  $scope.pushRing = function () { 
  	var ring = $scope.createRing();
  	$scope.$emit('ringCreated', ring);
  	$scope.rings.push(ring); 
  };

  $scope.ringCanAcceptFragment = function (ring) { return ring.ringFragments.length < 6; };

  $scope.pushRingFragment = function (ringFragment) {
  	var overflow = false;
    $scope.rings.length || $scope.pushRing();

    for (var ring in $scope.rings) {
      if ($scope.ringCanAcceptFragment($scope.rings[ring])) {
      	ringFragment.$$parent = $scope.rings[ring];
        $scope.rings[ring].ringFragments.push(ringFragment);
        $scope.rings[ring].addRingFragmentToRingGroup(ringFragment);
        break;
      }
    }

    ringFragment.$$parent || ($scope.pushRing(), $scope.pushRingFragment(ringFragment));
  };

  $scope.$on('jFrameSetupComplete', function () {
    $scope.camera.position.z = 3;
    $scope.rollCamera($timeout);
  });
});