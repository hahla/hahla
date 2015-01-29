console.log('yes');
hahla.directive('zelda', function() {
    return {
        controller: 'zeldaController',
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/zelda.html',
        scope: {
        }
    };
});

hahla.controller('zeldaController', function($scope, $timeout){
    $scope.zelda = $scope.zelda || {};
    $http.post('http://localhost:3000/game')
        .success(function(data, status, headers, config) {
            $scope.zelda.game = data;
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });

});