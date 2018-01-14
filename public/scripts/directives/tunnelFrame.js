JohnPositanoResume.directive(
  'tunnelFrame',
  function () {
    return {
      restrict: 'EA',
      controller: 'tunnelFrameController',
      link: function ($scope, $element, attrs, $controller) {
        var $w, $h;
        $scope.$w = $element.width();
        $scope.$h = $element.height();
        $scope.$f = $scope.$w / $scope.$h;
        $scope.$d = 165 - ($scope.$f * 25) + ($scope.$w / 80);

        $scope.scene = new THREE.Scene();
        $scope.renderer = new THREE.CSS3DRenderer();
        $scope.camera = new THREE.PerspectiveCamera(161 - (($scope.$w / $scope.$h) * ($scope.$w / 220) * 2.5), ($scope.$w / $scope.$h), .1, 1000);

        $scope.sizeUpFrame = function ($w, $h) {
          var $w = ($w || $scope.$w),
              $h = ($h || $scope.$h),
              $f = ($w / $h),
              $z = 0;

          $scope.camera.fov = 178 - ($f * 30);
          $scope.camera.aspect = $f;
          $scope.camera.updateProjectionMatrix();
          $scope.renderer.setSize($w, $h, true);
          $scope.animate();
        };

        $scope.animate = function () {
          $scope.renderer.render($scope.scene, $scope.camera);
        };

        $scope.sizeUpFrame();

        $element.append($scope.renderer.domElement);
        $scope.$canvas = angular.element($scope.renderer.domElement);

        $scope.framesThisSecond = 0;

        $scope.rollCamera = function ($timeout) {
          $scope.$emit('render');
          $scope.renderer.render($scope.scene, $scope.camera);
          setTimeout(function () { requestAnimationFrame($scope.rollCamera); });
        };

        $scope.$emit('tunnelFrameSetupComplete');
      },
    }
  }
);