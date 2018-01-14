JohnPositanoResume.directive(
	'jFrame',
	function () {
		return {
			restrict: 'EA',
			controller: 'jFrameController',
			link: function ($scope, $element, attrs, $controller) {
				$scope.$w = $element.width();
				$scope.$h = $element.height();
				$scope.$$element = $element;

				$scope.scene = new THREE.Scene();
				$scope.renderer = new THREE.WebGLRenderer({ alpha: true });
				$scope.camera = new THREE.PerspectiveCamera(161 - (($scope.$w / $scope.$h) * ($scope.$w / 220) * 2.5), ($scope.$w / $scope.$h), .1, 1000);

				$scope.sizeUpFrame = function ($w, $h) {
					var $w = ($w || $scope.$w),
							$h = ($h || $scope.$h),
							$f = ($w / $h),
							$z = 0;

					$scope.camera.fov = 161 - ($f * ($w / 220));
					$scope.camera.aspect = $f;
					$scope.camera.updateProjectionMatrix();
					$scope.renderer.setSize($w, $h);
				};

				$scope.sizeUpFrame();
				$scope.renderer.shadowMap.enabled = true;

				$element.append($scope.renderer.domElement);
				$scope.$canvas = angular.element($scope.renderer.domElement);

				$scope.animate = function () {
					// $scope.renderer.render($scope.scene, $scope.camera);
				};

				$scope.framesThisSecond = 0;

				$scope.rollCamera = function ($timeout) {
					$scope.$emit('render');
					$scope.renderer.render($scope.scene, $scope.camera);
					setTimeout(function () { requestAnimationFrame($scope.rollCamera); }, 10);
				};

				$scope.$emit('jFrameSetupComplete');
			},
		}
	}
);