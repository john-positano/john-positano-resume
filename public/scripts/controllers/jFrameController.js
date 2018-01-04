JohnPositanoResume.controller('jFrameController', function ($scope, $log, $timeout, $interval) {
	window.$scope = $scope;

	$scope.loadMeshWithMaterial = function (url) {
		var loader = new THREE.JSONLoader();
		loader.load(
			url,
			function (geometry) {
				var mesh = new THREE.Mesh(geometry);
				[mesh.scale.x, mesh.scale.y, mesh.scale.z] = Array(3).fill(0.75);
				mesh.translation = THREE.GeometryUtils.center(geometry);
				$scope.scene.add(new THREE.AmbientLight(0xffffff));
				$scope.scene.add(mesh);
				console.log($scope.scene);
			}
		);
	};

	$timeout(function () { 
		// $scope.loadMeshWithMaterial('/views/3dComponents/ring_fragment.json');

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			$scope.scene.add( cube );

			$scope.camera.position.z = 5;


		$scope.camera.position.z = 5; 
		$scope.animate(); 
	});
});