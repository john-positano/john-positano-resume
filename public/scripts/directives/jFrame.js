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

				$scope.sizeUpFrame = function ($w, $h) {
					var $w = ($w || $scope.$w),
							$h = ($h || $scope.$h),
							$f = ($w / $h),
							$z = 0;
					if ($scope && $scope.camera && $scope.camera.position && $scope.camera.position.z) {
						$z = $scope.camera.position.z;
					}
					console.log($f);
					$scope.camera = new THREE.PerspectiveCamera(161 - ($f * ($w / 220) * 2.5), $f, .1, 1000);
					$scope.camera.position.z = $z;
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
					setTimeout(function () { requestAnimationFrame($scope.rollCamera); }, 20);
				};

				$scope.$emit('jFrameSetupComplete');
			},
		}
	}
);