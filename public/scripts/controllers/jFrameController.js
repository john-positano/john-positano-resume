JohnPositanoResume.controller('jFrameController', function ($scope, $log) {
	$scope.loadMeshWithMaterial = function (url, material) {
		var loader = new THREE.JSONLoader();
		loader.load(
			url,
			function (geometry) {
				var mesh = new THREE.Mesh(geometry, material);
				[mesh.scale.x, mesh.scale.y, mesh.scale.z] = Array(3).fill(0.75);
				console.log(geometry);
				mesh.translation = THREE.GeometryUtils.center(geometry);
				$scope.scene.add(mesh);
			}
		);
	};

	$scope.loadColorMaterial = function (hexColor) { return new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); };
});