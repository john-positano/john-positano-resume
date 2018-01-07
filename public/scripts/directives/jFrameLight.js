JohnPositanoResume.directive(
  'jFrameLight',
  function () {
    return {
      restrict: 'EA',
      link: function ($scope, $element, attrs, $controller) {
        $scope.light = new THREE.PointLight(0xffffff, 4, 100, 2);
        $scope.nameLight = new THREE.PointLight(0xffffcc, 20, 100, 1);
        $scope.generalLight = new THREE.AmbientLight(0xffffff, 0.8);

        $scope.light.position.z = 24;
        $scope.nameLight.position.z = -100;

        $scope.scene.add($scope.light);
        $scope.scene.add($scope.nameLight);
        $scope.scene.add($scope.generalLight);
      },
    }
  }
);