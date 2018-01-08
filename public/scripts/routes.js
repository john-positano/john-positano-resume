JohnPositanoResume.config(
	function ($stateProvider, $locationProvider, $rootScopeProvider) {
		$locationProvider.html5Mode({ enabled: true, requireBase: false });

		$stateProvider
			.state(
				'main',
				{
			    url: '',
			    views: {
			    	'mainView': {
			    		templateUrl: 'views/homepage.html',
			    		controller: 'homePageController'
			    	},
			    	'tunnelView': {
			    		templateUrl: 'views/tunnelView.html'
			    	}
			    }
				}
			)
			.state(
				'main.one', 
				{ 
					url: '1',
					views: {
						'tunnelFrameBackground': {
							template: '<div class="full"></div>'
						}
					}
				}
			)
			.state(
				'main.two', 
				{ 
					url: '2',
					views: {
						'tunnelFrameBackground': {
							template: '<div class="full"></div>'
						}
					}
				}
			)
			.state(
				'main.three', 
				{ 
					url: '3',
					views: {
						'tunnelFrameBackground': {
							template: '<div class="full"></div>'
						}
					}
				}
			)
			.state(
				'main.four', 
				{ 
					url: '4',
					views: {
						'tunnelFrameBackground': {
							template: '<div class="full"></div>'
						}
					}
				}
			)
			.state(
				'main.five', 
				{ 
					url: '5',
					views: {
						'tunnelFrameBackground': {
							template: '<div class="full"></div>'
						}
					}
				}
			)
			.state(
				'main.six', 
				{ 
					url: '6',
					views: {
						'tunnelFrameBackground': {
							template: '<div class="yellow full"></div>'
						}
					}
				}
			);
	}
);