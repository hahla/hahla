import angular from 'angular'

require('../css/hahla.scss');
var hahla = angular.module('hahla', []);

hahla.controller('HahlaController', function($rootScope, $scope, $http, $log, $interval){
  $scope.hahla = {
    thinglist: ['for the gold', 'or gently into the ocean', 'and visit space on its own terms'],
  };
});

hahla.directive('lines', require('./lines.js'));
hahla.directive('convo', require('./convo.js'));
hahla.directive('waves', require('./waves/waves.js'));