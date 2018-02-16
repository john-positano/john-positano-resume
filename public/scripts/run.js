JohnPositanoResume
  .run(
  	function ($state, $rootScope, $log, $compile, $window, clickRouterService, $http) {
      $window.$compile = function (document, viewName) {
        $compile(document)($rootScope.$new());
        clickRouterService.routeFrame(document, viewName);
      };

      navigator.geolocation.getCurrentPosition(function (data) {
        $rootScope.coordinates = data.coords;

        $http.defaults.headers.post['x-www-latitude'] = $rootScope.coordinates.latitude;
        $http.defaults.headers.post['x-www-longitude'] = $rootScope.coordinates.longitude;
        
        $http.post('/ipLog', { latitude: data.coords.latitude, longitude: data.coords.longitude }).then(
          $log.log,
          $log.error
        );
      });
    }
  );