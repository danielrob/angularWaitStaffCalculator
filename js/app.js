var app = angular.module('app', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl : 'views/home.html'
        })
        .when('/new-meal', {
            templateUrl : 'views/new-meal.html',
            controller : 'appController'
        })
        .when('/my-earnings', {
            templateUrl : 'views/my-earnings.html',
            controller : 'myEarnings'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);

app.factory("earnings",function(){
        return {  'tipTotal'  : 0, 
                  'mealCount' : 0 };
});

app.controller('myEarnings', function($scope, earnings){
  
  $scope.earnings = earnings;

  $scope.tipAverage = function(){
    if ($scope.earnings.mealCount == 0) {
      return 0;
    } else {
    return $scope.earnings.tipTotal / $scope.earnings.mealCount;
    };
  };

  $scope.resetAll = function(){
    $scope.earnings.tipTotal = 0;
    $scope.earnings.mealCount = 0;
  };
});


app.controller('appController', function ($scope, earnings) {
  $scope.earnings = earnings;


  var _default_tax = 12.5;
  $scope.meal = {}

  $scope.meal.tax = _default_tax;


  $scope.subtotal = function(){
    if ($scope.meal.base == undefined || $scope.meal.tax == undefined) {
      return 0;
    } else {
      return $scope.meal.base + $scope.meal.base * $scope.meal.tax / 100;
    };
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

  $scope.cancel = function(){
    pristifyForm();
    $scope.meal = { tax: _default_tax };
  };

  $scope.submitMeal = function(){
    if (isEmpty($scope.newMeal.$error)) {
      // Submit the tipTotal.
      $scope.earnings.tipTotal += ($scope.meal.tip / 100 * $scope.meal.base);
      $scope.earnings.mealCount += 1;
      this.cancel();
      pristifyForm();
    }
  };

});