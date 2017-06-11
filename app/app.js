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

    $scope.createCard = function() {
      $http({
              method: "GET",
              url: "/newcard"

          }).then(function mySucces(response) {
              $scope.result = response.data;
              console.log($scope.cards);
          }, function myError(response) {
              $scope.myWelcome = response.statusText;
          });
    }

    // $scope.seashdashboard = 'd1'



    $scope.addCard = function(x, y) {
      $http({
              method: "POST",
              url: "/changecard",
              data: { xpos : x,
                      ypos : y}
          }).then(function mySucces(response) {
              $scope.result = response.data;
              console.log($scope.cards);
          }, function myError(response) {
              $scope.myWelcome = response.statusText;
          });
    }


    interact('.desctop .deshboard .card')
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
          var textEl = event.target.querySelector('p');

          textEl && (textEl.textContent =
            'moved a distance of '
            + (Math.sqrt(event.dx * event.dx +
                         event.dy * event.dy)|0) + 'px');
        }
      });

      function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        // target.style.webkitTransform =
        // target.style.transform =
        //   'translate(' + x + 'px, ' + y + 'px)';

        $scope.xpos = x;
        $scope.ypos = y;

        // console.log();
        //
        // console.log($scope.xpos);

        target.style["left"]=  x +'px';
        target.style["top"]= (target.scrollTop )+ y + 'px';

        // console.log(target.style["left"]);

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        $scope.addCard(x, y)
      }

      // this is used later in the resizing and gesture demos
      window.dragMoveListener = dragMoveListener;

    // $scope.getCard = function(){
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
    // }

  })

})();
