hahla = angular.module('hahla', []);

hahla.controller('HahlaController', function($scope, $http, $log){
  $scope.hahla = {
    thinglist: ['ok', 'not right now', 'send me a letter'],
    animate: true
  };

  $http.post('http://localhost:3000/hi').
    success(function(data, status, headers, config) {
        $scope.resp = data.hi
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });

});

