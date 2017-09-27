var app = angular.module("productApp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/",
        {
            templateUrl : "views/home.html",
            controller :  "homeController"
        }).
        when("/add",
        {
            templateUrl : "views/products/add.html",
            controller :  "productController"
        });
});
app.controller("homeController",function($scope){
    $scope.model = {
        message:"Hello World"
    };
});
