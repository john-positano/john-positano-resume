JohnPositanoResume.directive(
  'ringFragment',
  function () {
    return {
      restrict: 'EA',
      link: function ($scope) {
        $scope.loadMesh(
          '/views/3dComponents/ring_fragment.json',
          function (geometry) {
            var $rF = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
            [$rF.scale.x, $rF.scale.y, $rF.scale.z] = Array(3).fill(0.75);
            $rF.translation = geometry.center();
            $rF.rotation.x = Math.PI / -2;
            $rF.rotation.z = Math.PI / -2;
            $scope.pushRingFragment($rF);
            $rF.rotation.y = (Math.PI * ($rF.$$parent.ringFragments.length - 1)) / 3;
            $scope.scene.add($rF);
            $scope.animate();
          }
        )
      }
    };
  }
);