var app = angular.module("productApp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/",
        {
            templateUrl : "views/home.html",
            controller :  "homeController"
        }).
        when("/add/:productId?",
        {
            templateUrl : "views/products/add.html",
            controller :  "productController",
            resolve: {
                proImage : function(){
                    return {
                        hotelName:function(){
                            return "myFreind Hotel";
                        },
                        hotelAddress:function(){
                            return "myFr Address"
                        }
                    }
                }
            }
        }).
        when("/products",
        {
            templateUrl:    "views/products/view.html",
            controller:     "productController"
        });
});
app.controller("homeController",function($scope){
    $scope.model = {
        message:"Hello World"
    };
});
