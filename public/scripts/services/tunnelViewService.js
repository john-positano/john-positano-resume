JohnPositanoResume.service('tunnelViewService', function ($http, $q) {
  var self = this;

  self.load = function (url) {
    var viewDeferred = $q.defer();

    $http.get(url).then(
      function (resolvedData) {
        viewDeferred.resolve({ data: resolvedData.data, error: null });
      },
      function (rejectedError) {
        viewDeferred.reject({ data: null, error: rejectedError });
      }
    );

    return viewDeferred.promise;
  };

  return self;
});