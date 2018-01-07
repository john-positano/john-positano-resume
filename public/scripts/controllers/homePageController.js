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
      var $stateSignature = (
        ($e.originalEvent.deltaY > 0) 
          ? ('forwards') 
          : ('backwards')
      ) + $scope.camera.position.z;
      console.log($stateSignature);
      switch ($stateSignature) {
        case 'backwards2':
          $state.go('main');
          break;
        case 'forwards2':
        case 'backwards-8':
          $state.go('main.one');
          break;
        case 'forwards-8':
        case 'backwards-18':
          $state.go('main.two');
          break;
        case 'forwards-18':
        case 'backwards-28':
          $state.go('main.three');
          break;
        case 'forwards-28':
        case 'backwards-38':
          $state.go('main.four');
          break;
        case 'forwards-38':
        case 'backwards-48':
          $state.go('main.five');
          break;
        case 'forwards-48':
        case 'backwards-58':
          $state.go('main.six');
          break;
      }
    }
  );
});