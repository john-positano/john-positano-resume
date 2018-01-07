JohnPositanoResume.directive(
	'jFrame',
	function () {
		return {
			restrict: 'EA',
			controller: 'jFrameController',
			link: function ($scope, $element, attrs, $controller) {
				var $w = $element.width();
				var $h = $element.height();

				$scope.scene = new THREE.Scene();
				$scope.camera = new THREE.PerspectiveCamera(75, ($w / $h), .1, 1000);
				$scope.renderer = new THREE.WebGLRenderer({ alpha: true });
				$scope.renderer.setSize($w, $h);

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