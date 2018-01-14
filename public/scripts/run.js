JohnPositanoResume.run(
	function ($state, $rootScope, $log, $compile, $window, clickRouterService) {
		$state.go('main');
    $window.$compile = function (document, viewName) {
      console.log('compiling ' + viewName);
      $compile(document)($rootScope.$new());
      clickRouterService.routeFrame(document, viewName);
    };
  }
);