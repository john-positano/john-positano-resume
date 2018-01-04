JohnPositanoResume.directive(
	'jFrame',
	function () {
		return {
			restrict: 'EA',
			// controller: 'jFrameController',
			bindToController: true,
			require: ['jFrameController', 'jFrameCameraController'],
			link: function ($scope, $element, attrs, $controller) {
				console.log($controller);

				var $w = $element.width();
				var $h = $element.height();

				$scope.scene = new THREE.Scene();
				$scope.camera = new THREE.PerspectiveCamera(75, ($w / $h), .1, 1000);
				$scope.renderer = new THREE.WebGLRenderer();
				$scope.renderer.setSize($w, $h);

				$element.append($scope.renderer.domElement);

				window.$$pos = $scope.camera.position;

				$scope.$canvas = angular.element($scope.renderer.domElement);

				$scope.animate = function () {
					$scope.renderer.render($scope.scene, $scope.camera);
				};
			},
		}
	}
);