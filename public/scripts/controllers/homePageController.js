JohnPositanoResume.controller('homePageController', function ($scope, $log, $timeout) {
  $timeout(
    function () {
      $scope.loadMesh(
        '/views/3dComponents/john_positano.json',
        function (geometry) {
          $JP = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
          [$JP.scale.x, $JP.scale.y, $JP.scale.z] = Array(3).fill(100);
          $JP.rotation.y = Math.PI / -2;
          $JP.position.z = -125;
          $scope.scene.add($JP);
        }
      );

      $scope.loadMesh(
        '/views/3dComponents/scroll_down.json',
        function (geometry) {
          var $SD = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
          [$SD.scale.x, $SD.scale.y, $SD.scale.z] = Array(3).fill(1);
          $SD.rotation.y = Math.PI / -2;
          $SD.position.y = -11;
          $SD.position.z = 0;
          $scope.scene.add($SD);
        }
      );

      $scope.loadMesh(
        '/views/3dComponents/scroll_down_arrow.json',
        function (geometry) {
          var $SD = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
          [$SD.scale.x, $SD.scale.y, $SD.scale.z] = Array(3).fill(1);
          $SD.rotation.y = Math.PI / -2;
          $SD.position.y = -11;
          $SD.position.z = 0;
          $scope.scene.add($SD);
        }
      );

    }
  );
});