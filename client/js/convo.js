hahla.directive('convo', function() {
    return {
        controller: 'ConvoController',
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/convo.html',
        scope: {
            animate: '=run',
        }
    };
});


hahla.controller('ConvoController', function($scope, $timeout){
    var promptFull = '.... can we talk?', idx=0;
    $scope.blinkOn = false;

    // $scope.rollout = function(stop){
    //     $scope.prompt = "asdfasdf"; $scope.blinkOn = true;
    // };
    speed = 200;
    $scope.rollout = function(){
        $timeout(function(){
            $scope.prompt = promptFull.slice(0, idx);
            if (idx > promptFull.length){
                $scope.blinkOn = true;
            } else {
                idx++;
                $scope.rollout();
                if (idx == 4){
                    speed = 2000; // pause hack
                } else {
                    speed = 200;
                }
            }
        }, speed);
    };

    $scope.rollout();
});