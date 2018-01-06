JohnPositanoResume.directive(
  'ring',
  function () {
    return {
      restrict: 'EA',
      link: function ($scope) {
        $scope.pushRing();
      }
    };
  }
);