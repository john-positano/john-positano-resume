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
			    	},
						'tunnelFrameBackground': {
							template: '<div class="full darkgrey"></div>'
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
							template: '<div class="full red"></div>',
							controller: 'webDevelopmentController'
						},
					},
					resolve: {
						$tunnelStateChangeStart: function () {
							$rootScope.$emit('$tunnelStateChangeStart', 'main.one');
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
							template: '<div class="full green"></div>'
						}
					},
					resolve: {
						$tunnelStateChangeStart: function () {
							$rootScope.$emit('$tunnelStateChangeStart', 'main.two');
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
							template: '<div class="full orange"></div>'
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
							template: '<div class="full blue"></div>'
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
							template: '<div class="full yellow"></div>'
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
							template: '<div class="full purple"></div>'
						}
					}
				}
			);
	}
);