JohnPositanoResume.directive(
  'gridElement',
  function () {
    return {
      restrict: 'E',
      controller: function ($window, $scope) {
        var $ng = angular.element;

        $ng($window).on('resize', function () {

        });
      },  
      link: function ($scope, $element, $attrs, $controller) {
        $scope.$element = $element;
        $scope.classList = $attrs.class.split(' ');
        $scope.widthClass = null;
        $scope.heightClass = null;

        $scope.classList = $scope.classList.reduce(
          function (agg, val) {
            !val.match(/w-[0-9]/) || ($scope.widthClass = val);
            !val.match(/h-[0-9]/) || ($scope.heightClass = val);
          },
          []
        );

        console.log($scope);
      }
    };
  }
);