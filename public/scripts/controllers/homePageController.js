JohnPositanoResume.controller('homePageController', function ($scope, $log, $timeout) {
  $timeout(
    function () {
      $scope.loadMesh(
        '/views/3dComponents/john_positano_alt.json',
        function (geometry) {
          $JP = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
          [$JP.scale.x, $JP.scale.y, $JP.scale.z] = Array(3).fill(100);
          $JP.rotation.y = Math.PI / -2;
          $JP.position.z = -125;
          $scope.scene.add($JP);
        }
      );
    }
  );
});