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
				$scope.renderer = new THREE.WebGLRenderer();
				$scope.renderer.setSize($w, $h);

				$element.append($scope.renderer.domElement);

				$scope.camera.position.z = 5;

				$scope.$canvas = angular.element($scope.renderer.domElement);

				window.$pos = $scope.camera.position;

				$scope.animate = function () {
					requestAnimationFrame( $scope.animate );
					$scope.renderer.render($scope.scene, $scope.camera);
				};

				$controller.$3scope = $scope;
			},
		}
	}
);