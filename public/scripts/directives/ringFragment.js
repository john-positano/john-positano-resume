JohnPositanoResume.directive(
  'ringFragment',
  function () {
    return {
      restrict: 'EA',
      link: function ($scope) {
        $scope.loadMesh(
          '/views/3dComponents/ring_fragment.json',
          function (geometry) {
            var $rF = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
            [$rF.scale.x, $rF.scale.y, $rF.scale.z] = Array(3).fill(0.75);
            $rF.rotation.x = Math.PI / -2;
            $rF.rotation.z = Math.PI / -2;
            $scope.pushRingFragment($rF);
            $rF.rotation.y = (Math.PI * ($rF.$$parent.ringFragments.length - 2.5)) / 3;
            $rF.position.z = (-1 * ($rF.$$parent.ringNumber - 1)) * 10;
          }
        )
      }
    };
  }
);