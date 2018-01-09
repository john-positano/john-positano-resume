JohnPositanoResume.directive(
  'tunnelFrame',
  function () {
    return {
      restrict: 'EA',
      controller: 'tunnelViewController',
      link: function ($scope, $element, attrs, $controller) {
        console.log('tunnelFrame directive called');
        var $w, $h;
        $scope.$w = $element.width();
        $scope.$h = $element.height();

        $scope.scene = new THREE.Scene();
        $scope.renderer = new THREE.CSS3DRenderer();

        $scope.sizeUpFrame = function ($w, $h) {
          var $w = ($w || $scope.$w),
              $h = ($h || $scope.$h),
              $f = ($w / $h),
              $z = 0;
          if ($scope && $scope.camera && $scope.camera.position && $scope.camera.position.z) {
            $z = $scope.camera.position.z;
          }
          var adjustmentFactor = ((Math.pow($f, .6) - .6) * 30);
          $scope.camera = new THREE.PerspectiveCamera(172 - adjustmentFactor, $f, .1, 1000);
          console.log('adjustmentFactor', adjustmentFactor);
          $scope.camera.position.z = $z;
          $scope.renderer.setSize($w, $h);
        };

        $scope.sizeUpFrame();

        $element.append($scope.renderer.domElement);
        $scope.$canvas = angular.element($scope.renderer.domElement);

        $scope.animate = function () {
          $scope.renderer.render($scope.scene, $scope.camera);
        };

        $scope.framesThisSecond = 0;

        $scope.rollCamera = function ($timeout) {
          $scope.$emit('render');
          $scope.renderer.render($scope.scene, $scope.camera);
          setTimeout(function () { requestAnimationFrame($scope.rollCamera); }, 20);
        };

        $scope.$emit('tunnelFrameSetupComplete');
        console.log('tunnelFrameSetupComplete');
      },
    }
  }
);