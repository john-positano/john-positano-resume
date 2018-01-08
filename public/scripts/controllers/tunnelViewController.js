JohnPositanoResume.controller('tunnelViewController', function ($scope, $log, $timeout, $rootScope, $state, tunnelViewService, $window) {
  window.$tunnelScope = $scope;
  $scope.view;
  $scope.currentStateName = $state.$current.name;

  $scope.stateErrorHandler = function (payload) {
    $log.log('$scope.stateErrorHandler', payload);
  };

  $scope.stateViewHandler = function (payload, $z) {
    // $log.log('$scope.stateViewHandler', payload);
      $scope.scene.remove($scope.view);
      var $div = $(
        '<div></div', 
        {
          class: "slim full border THREECSS3dRenderer",
        }
      )[0];
      $div.innerHTML = payload.data;
      var $divObject = new THREE.CSS3DObject($div);
      $divObject.position.x = 
      $divObject.position.y = 0;
      $divObject.position.z = $z;
      $divObject.scale.x = 
      $divObject.scale.y = 
      $divObject.scale.z = 0.5;
      // $rootScope.$on(
      //   'click', 
      //   function (_, $e) { 
      //     $divObject.element.dispatchEvent(
      //       new MouseEvent('click', $e.originalEvent)
      //     ); 
      //   }
      // );
      $divObject.element.addEventListener(
        'click', 
        function ($e) { console.log($e); }
      );

      $scope.view = $divObject;
      // console.log('$divObject for click event', $divObject);
      $scope.scene.add($divObject);
      $scope.animate();
  };

  $scope.loadState = tunnelViewService.load;

  $scope.tunnelRouter = function ($nextState, $previousState, $scope) {
    var $load = $scope.loadState;
    var $err = $scope.stateErrorHandler;
    var $view = $scope.stateViewHandler;
    var offset = -50;
    var interval = -15;

    switch ($nextState) {
      case 'main':
        $scope.scene.remove($scope.view);
        break;
      case 'main.one':
        $load('/views/components/tunnel/tunnelView1.html').then(function ($p) { $view($p, offset + (interval * 1)); }, $err);
        break;
      case 'main.two':
        $load('/views/components/tunnel/tunnelView2.html').then(function ($p) { $view($p, offset + (interval * 2)); }, $err);
        break;
      case 'main.three':
        $load('/views/components/tunnel/tunnelView3.html').then(function ($p) { $view($p, offset + (interval * 3)); }, $err);
        break;
      case 'main.four':
        $load('/views/components/tunnel/tunnelView4.html').then(function ($p) { $view($p, offset + (interval * 4)); }, $err);
        break;
      case 'main.five':
        $load('/views/components/tunnel/tunnelView5.html').then(function ($p) { $view($p, offset + (interval * 5)); }, $err);
        break;
      case 'main.six':
        $load('/views/components/tunnel/tunnelView6.html').then(function ($p) { $view($p, offset + (interval * 6)); }, $err);
        break;
      default:
        break;
    }
  };

  $scope.bindElement = function () {

  };

  $rootScope.$on(
    'scroll',
    function (_, $e, $jFrameScope) {
      $scope.camera.position.z = $jFrameScope.camera.position.z;
    }
  );

  $scope.$watch(function () { return $state.$current.name; }, $scope.tunnelRouter);

  $timeout(function() { $scope.rollCamera(); });
  angular.element($window).on(
    'resize',
    function () {
      $scope.sizeUpFrame($window.innerWidth, $window.innerHeight);
      // console.log($window.innerWidth, $window.innerHeight);
    }
  );
});