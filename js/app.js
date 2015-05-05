var app = angular.module('app', []);

app.controller('appController', ['$scope', function ($scope) {
  
  var _default_tax = 8;
  $scope.meal = {}
  $scope.meal.base = 200;
  $scope.meal.tip = 19;
  $scope.meal.tax = _default_tax;


  function initEarnings(){
    $scope.earnings = {}
    $scope.earnings.tipTotal = 0;
    $scope.earnings.mealCount = 0;
  };

  initEarnings();

  $scope.tipAverage = function(){
    if ($scope.earnings.mealCount == 0) {
      return 0;
    } else {
    return $scope.earnings.tipTotal / $scope.earnings.mealCount;
    };
  };

  $scope.subtotal = function(){
    if ($scope.meal.base == undefined || $scope.meal.tax == undefined) {
      return 0;
    } else {
      return $scope.meal.base + $scope.meal.base * $scope.meal.tax / 100;
    };
  };

  $scope.submitMeal = function(){
    if (isEmpty($scope.newMeal.$error)) {
      $scope.earnings.tipTotal += ($scope.meal.tip / 100 * $scope.meal.base);
      $scope.earnings.mealCount += 1;
      this.cancel();
      pristifyForm();
    }
  };

  $scope.cancel = function(){
    pristifyForm();
    $scope.meal = { tax: _default_tax };
  };

  $scope.resetAll = function(){
    this.cancel();
    initEarnings();
  };

  function pristifyForm(){
    $scope.newMeal.$setPristine();
    $scope.newMeal.$setUntouched();
  };

  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }

}]);