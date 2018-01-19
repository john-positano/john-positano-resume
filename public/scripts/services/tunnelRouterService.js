JohnPositanoResume.service('tunnelRouterService', function ($http, $q, $state, $log, $compile, $controller, $rootScope) {
  var self = this;

  self.tunnelViews = [];
  self.tunnelRoutes = [];
  self.$scope = {};

  self.bindScope = function ($s) { 
    self.$scope = $s;
    $s.animate();
  };

  self.getViewBundle = function (urlBundle) {
    var viewDeferred = {
      front: $q.defer(),
      center: $q.defer(),
      back: $q.defer()
    }

    $http.get(urlBundle.front).then(viewDeferred.front.resolve,viewDeferred.front.reject);
    $http.get(urlBundle.center).then(viewDeferred.center.resolve,viewDeferred.center.reject);
    $http.get(urlBundle.back).then(viewDeferred.back.resolve,viewDeferred.back.reject);

    return $q.all([viewDeferred.front.promise, viewDeferred.center.promise, viewDeferred.back.promise]);
  };

  self.loadTunnelViews = function (tunnelViewBundleArray) {
    for (var viewBundle in tunnelViewBundleArray) {
      self
        .getViewBundle(tunnelViewBundleArray[viewBundle])
        .then(
          function ($vArray) {
            var $s = $rootScope.$new(true);

            for (var $v in $vArray) {
              var $div = $compile(
                $(
                  '<div></div>', 
                  {
                    class: 'THREECSS3dRenderer hidden',
                    style: 'width: 100%; height: 100%;'
                  }
                ).html($vArray[$v].data)
              )
              ($s);
              $divObject =  new THREE.CSS3DObject($div[0]);
              $divObject.$scope = $s;
              $divObject.position.x = 
              $divObject.position.y = 0;
              $divObject.position.z = -10;
              $divObject.scale.x = 
              $divObject.scale.y = 
              $divObject.scale.z = 0.05 - (screen.width / 100000);
              self.$scope.scene.add($divObject);
              self.positionTunnelView(self.tunnelViews.push($divObject) - 1);
              self.$scope.animate();
            }
          },
          $log.error
        );
    }
  };

  self.positionTunnelView = function (viewNumber) {
    self.tunnelViews[viewNumber].position.z = -12 - (viewNumber * 3) - (Math.floor((viewNumber) / 3) * 15);
  };

  self.clearView = function () {
    for (var object in self.$scope.scene.children) {
      self.$scope.scene.remove(self.$scope.scene.children[object]);
    }
  };

  self.loadViewNumbers = function (viewNumberArray) {
    angular.element('.THREECSS3dRenderer').addClass('hidden');
    for (var viewNumber in viewNumberArray) {
      var $tunnelView = angular.element(self.tunnelViews[viewNumberArray[viewNumber]].element);
      $tunnelView.removeClass('hidden');
    }
  };

  $rootScope.$on('$tunnelStateChangeStart', function (_, $state) {
    switch ($state) {
      case 'main':
        self.loadViewNumbers();
        break;
      case 'main.one':
        self.loadViewNumbers([0, 1, 2]);
        break;
      case 'main.two':
        self.loadViewNumbers([3, 4, 5]);
        break;
      default:
        break;
    };
  });

  return self;
});