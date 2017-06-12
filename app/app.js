(function(){                                                     // Объявляю анонимную функци
  var DashbordApp = angular.module('DashbordApp', ['ngRoute']);  //

  DashbordApp.factory('cardFactory',function(){
    return {
      card : NaN,
      style : NaN
    }
  })

  DashbordApp.factory('userFactory',function(){
    return {
      name : NaN,
      password : NaN
    }
  })

  DashbordApp.config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: 'public/views/login.html',
        controller: 'authCtrl'
      }).when('/signup',{
        templateUrl: 'public/views/signup.html',
        controller: 'authCtrl'
      }).when('/dashbord',{
        templateUrl: 'public/views/dashbord.html',
        controller: 'dashbordCtrl'
      })

      .otherwise({
        redirectTo : '/'

      });
  });

[{"_id":"593d6138999a437e2f40b8ae","parent":"d2","style":{"sticker_color":"#000","sticker_h":"100","sticker_w":"200","sticker_left":"100","sticker_top":"100"},"title":{"text":"title","font_size":"14","font_color":"#000"},"textarea":{"text":"lets do something really awesome","font_size":"14","fon_color":"#000"}}]



  DashbordApp.controller('dashbordCtrl', function($scope, $http, cardFactory, userFactory){

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

    $scope.seashdashboard  = 'd1';



    $scope.getCard = function (id) {       //получить параметры карточки

    }

    $scope.sendTest = function (id) {
      // var temp = $scope.getCard(id);
      //   cardFactory.card = id;
      //   cardFactory.style = temp;

        $http({
                method: "GET",
                url: "/getCard/" + id
            }).then(function mySucces(response) {
                $scope.getCard = response.data;
                console.log($scope.getCard);
            }, function myError(response) {
                $scope.myWelcome = response.statusText;
            });

        // var temp = $scope.getCard(id);
        cardFactory.card = $scope.getCard._id;
        cardFactory.style = $scope.getCard.style;


        console.log(cardFactory.style);
        console.log($scope.data);

          $http.post('/test',$scope.getCard.style).
          then(function(data) {
              console.log("posted successfully");
          },function(data) {
              console.error("error in posting");
          })
    }

    $scope.setParam = function (id) {      //задать прарметры фабрики указаного элемента

      var temp = $scope.getCard(id);
        cardFactory.card = id;
        cardFactory.style = temp;
        console.log(cardFactory.style);
    }


    $scope.addCard = function(x, y, id) {

      $scope.data = {"x":x,
                      "y":y };

      console.log($scope.data);

        $http.put('/newpos/' + id ,$scope.data).
        then(function(data) {
            console.log("posted successfully");
        },function(data) {
            console.error("error in posting");
        })
    }    //добавить карточку


    $scope.saveChanges = function(id){        //сохранить изменения в карточке
      console.log($scope.xpos);
      console.log($scope.ypos);

      $scope.addCard($scope.xpos, $scope.ypos, id);

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
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        $scope.xpos = x;
        $scope.ypos = y;

        target.style["left"]=  x +'px';
        target.style["top"]= (target.scrollTop )+ y + 'px';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

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

  DashbordApp.controller('authCtrl', function ($scope,$http,userFactory){
    // console.log($scope.signupdata);
    $scope.logData = function (){
      console.log($scope.signupdata);
      console.log($scope.user);
      console.log($scope.pass1);
      console.log($scope.pass2);
    }



    $scope.verification = function(){


      $http.post('/registrate' ,{"user":$scope.user,"pass":$scope.pass}).
      then(function(data) {
          console.log(data.data[0]);
          $scope.result = data.data[0];
      },function(data) {
          console.error("error in posting");

      })

      if ($scope.result._id) {
        console.log('s');
        userFactory.name = $scope.result.name;
        userFactory.password = $scope.result.password;
        console.log(window.location.href);
        document.location.replace("/#!/dashbord");
        console.log(window.location.href);
      }

    }



    $scope.passSimilarity = function() {

    }



  })

})();
