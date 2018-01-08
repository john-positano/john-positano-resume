JohnPositanoResume.controller('homePageController', function ($scope, $log, $timeout, $rootScope, $state) {
  $scope.$state = $state;
  $timeout(
    function () {
      $scope.loadMesh(
        '/views/3dComponents/john_positano.json',
        function (geometry) {
          $JP = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
          $JP.material.opacity = 1.0;
          [$JP.scale.x, $JP.scale.y, $JP.scale.z] = Array(3).fill(100);
          $JP.rotation.y = Math.PI / -2;
          $JP.position.z = -125;
          $JP.position.x = .6;
          $JP.position.y = -.5;
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

  $rootScope.$on(
    'scroll',
    function (_, $e) {
      var $z = $scope.camera.position.z;
      switch (true) {
        case $z > 1:
          $state.go('main');
          break;
        case ($z <= 1) && ($z > -14):
          $state.go('main.one');
          break;
        case ($z <= -14) && ($z > -29):
          $state.go('main.two');
          break;
        case ($z <= -29) && ($z > -44):
          $state.go('main.three');
          break;
        case ($z <= -44) && ($z > -59):
          $state.go('main.four');
          break;
        case ($z <= -59) && ($z > -74):
          $state.go('main.five');
          break;
        case ($z <= -70) && ($z > -89):
          $state.go('main.six');
          break;
      }
    }
  );

  $timeout(
    function () {
      $scope.$canvas.on('click', function ($e) { $rootScope.$emit('click', $e, $scope); }); 
    }
  );
});