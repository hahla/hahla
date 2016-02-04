var dumController = function($scope) {
    $scope.stuff = 'yes its just dumb';
};

define(function(require) {
    return function() {
        return {
            restrict: 'E',
            replace: false,
            template: '<div id="dum">hi there, {{stuff}}</div>',
            controller: dumController
        };
    };
});