(function(){                                                     // Объявляю анонимную функци
  var DashbordApp = angular.module('DashbordApp', ['ngRoute']);  //

  DashbordApp.config(function($routeProvider){
    $routeProvider
      .when('/dashbord',{
        templateUrl: 'public/views/dashbord.html',
        controller: 'dashbordCtrl'
      })
      .otherwise({
        redirectTo : '/'
      });
  });
  DashbordApp.controller('dashbordCtrl', function($scope, $http){
    // $scope.cards

    $http({
            method: "GET",
            url: "/getCards"
        }).then(function mySucces(response) {
            $scope.cards = response.data;
            console.log($scope.cards);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    console.log($scope.cards + 'vsdvsdfv');
    // $scope.addCard = function() {
    //
    //   // $http({
    //   //
    //   // })
    // }


  })

})();
