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
            resolve : {
                checkId: function($q,$timeout,$http,$route,$location){
                    var defer = $q.defer();
                    if(angular.isDefined($route.current.params.productId)){

                    var productData = {};
                    var productId = $route.current.params.productId;
                    $http.get("model/checkProductById.php?productId="+productId).then(function(data){
                        if(data.data.status==1){
                            productData = data.data.data;
                            // console.log("afterthis");
                            // console.log(productData);
                            defer.resolve(productData);
                            //return productData;
                        }else{
                            //defer.reject();
                            $location.path("/");

                        }
                    });
                    }else{
                        defer.resolve({});
                    }

                    return defer.promise;
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
        message:"Hello World from Js"
    };
});
