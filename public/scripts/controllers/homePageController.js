JohnPositanoResume.controller('homePageController', function ($scope, $log, $timeout, $rootScope, $state) {
  $scope.$state = $state;
  $timeout(
    function () {
      $scope.loadMesh(
        '/views/3dComponents/john_positano.json',
        function (geometry) {
          $JP = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff }));
          $JP.material.opacity = 1.0;
          $JP.scale.x = 100;
          $JP.scale.y = 100;
          $JP.scale.z = 100;
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
          $SD.scale.x = 1;
          $SD.scale.y = 1;
          $SD.scale.z = 1;
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
          $SD.scale.x = 1;
          $SD.scale.y = 1;
          $SD.scale.z = 1;
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
      var $tunnelStateChangeStart = true;
      switch (true) {          
        case $z > 1:
          ($state.$current.name == 'main') || $rootScope.$emit('$tunnelStateChangeStart', 'main');
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
        case ($z <= -74) && ($z > -89):
          $state.go('main.six');
          break;
        default:
          $tunnelStateChangeStart = false;
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