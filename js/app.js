var app = angular.module('app', []);

app.controller('appController', ['$scope', function ($scope) {
  
  $scope.meal = {}
  $scope.meal.base = 100;
  $scope.meal.tax = 12;
  $scope.meal.tip = 19;

  $scope.earnings = {}
  $scope.earnings.tipTotal = 0;
  $scope.earnings.mealCount = 0;

  $scope.tipAverage = function(){
    if ($scope.earnings.mealCount == 0) {
      return 0;
    } else {
    return $scope.earnings.tipTotal / $scope.earnings.mealCount;
    };
  };

  $scope.subtotal = function(){
    return $scope.meal.base + $scope.meal.base * $scope.meal.tax / 100;
  };
}]);