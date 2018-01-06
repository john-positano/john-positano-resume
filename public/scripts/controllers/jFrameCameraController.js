JohnPositanoResume.controller('jFrameCameraController', function ($rootScope, $scope, $log, $timeout, $interval, $document) {
  $scope._mouseDown = false;
  $scope.mouseDown = function ($e) { $scope._mouseDown = true; };

  $scope.mouseUp = function ($e) { $scope._mouseDown = false; };

  $scope.mouseMove = function ($e) {
    !($scope._mouseDown && $e.shiftKey) || $scope.dragControl($e); 
  };

  $scope.scrollControl = function ($e) {
    ($e.originalEvent.deltaY > 0) ? $scope.camera.position.z++ : $scope.camera.position.z--;
    $scope.animate();
  };

  $scope.dragControl = function ($e) {
    $scope.camera.position.x += $e.originalEvent.movementX / -100;
    $scope.camera.position.y += $e.originalEvent.movementY / 100;
    $scope.animate();
  };

  $document.on('keydown', $scope.keyDown);
  $document.on('keyup', $scope.keyUp);
  $scope.$canvas.on('mousedown', $scope.mouseDown);
  $scope.$canvas.on('mouseup', $scope.mouseUp);
  $scope.$canvas.on('mousemove', $scope.mouseMove);
  $scope.$canvas.on('mousewheel', $scope.scrollControl);
});