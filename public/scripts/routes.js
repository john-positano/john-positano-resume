JohnPositanoResume.config(
	function ($stateProvider, $locationProvider) {
		$locationProvider.html5Mode({ enabled: true, requireBase: false });

		$stateProvider
			.state(
				'/',
				{
				    url: '/',
				    views: {
				    	'main' : {
				    		templateUrl: 'views/homepage.html',
				    		controller: 'homePageController',
				    		resolve: {
				    				'OrbitControls': function (jFrameCameraController) {
				    						return 1;
				    				}
				    		}
				    	}
				    }
				}
			);
	}
);