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
			    		template: '<div class="darkgrey full></div>'
			    	}
			    }
				}
			)
			.state(
				'main.one', 
				{ 
					url: '1',
					views: {
						'tunnelView': {
							template: '<div class="green full"></div>'
						}
					}
				}
			)
			.state(
				'main.two', 
				{ 
					url: '2',
					views: {
						'tunnelView': {
							template: '<div class="red full"></div>'
						}
					}
				}
			)
			.state(
				'main.three', 
				{ 
					url: '3',
					views: {
						'tunnelView': {
							template: '<div class="blue full"></div>'
						}
					}
				}
			)
			.state(
				'main.four', 
				{ 
					url: '4',
					views: {
						'tunnelView': {
							template: '<div class="orange full"></div>'
						}
					}
				}
			)
			.state(
				'main.five', 
				{ 
					url: '5',
					views: {
						'tunnelView': {
							template: '<div class="purple full"></div>'
						}
					}
				}
			)
			.state(
				'main.six', 
				{ 
					url: '6',
					views: {
						'tunnelView': {
							template: '<div class="yellow full"></div>'
						}
					}
				}
			);
	}
);