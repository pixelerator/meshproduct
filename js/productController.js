// adding populate service to get product data

app.factory('productService', function($rootScope, $http) {
    var productService = {};

    productService.data = {};

    //Gets the list of nuclear weapons
    productService.getProducts = function() {
        $http.get('model/get_products.php')
            .then(function(data) {

                productService.data.products = data.data;
            },function(data){

            });

        return productService.data;
    };

    return productService;
});
//end of it

app.controller("productController",function($scope, $http,productService,$routeParams,$route){

   // $scope.productId = $routeParams.productId;
    $scope.currentId = 0;
    $scope.model = {
        message:"Hello World from products"
    };
    if(angular.isDefined($route.current)){
        if($route.current.loadedTemplateUrl=="views/products/add.html"){
            console.log($route.current.loadedTemplateUrl);
            var currentProduct = $route.current.locals.checkId;
            $scope.productName = currentProduct.productName;
            $scope.productDescription = currentProduct.productDescription;
            $scope.currentId = currentProduct.id;

        }


    }

    $scope.formValid = false;
    $scope.$watch('productForm', function(  ) {
        console.info('productForm watch');

    });

    $scope.model.products = productService.getProducts();

    $scope.model.currentProduct = {};
    $scope.productError = false;
    $scope.productErrorList = [];
    $scope.addProduct = function(){
        if($scope.formValid){
            $scope.model.currentProduct =
                    {
                        productName : $scope.productName,
                        productDescription: $scope.productDescription,
                        productImage : $scope.productImage,
                        productId : $scope.currentId

                    };
            console.log($scope.model.currentProduct);


            $http.post('model/save_product_json.php', $scope.model.currentProduct)
                .then(
                function (response) {
                    $scope.productErrorList = [];
                    $scope.productError = false;
                     console.log(response.data);
                    //errors
                    if(response.data.status==1){
                        $scope.productError = true;
                        angular.forEach(response.data.errorData, function(value, key) {
                            value = value.join("</br>");
                            $scope.productErrorList.push(value);


                        });
                        console.log($scope.productErrorList);
                    }else{
                        //No Error
                    }

                },
                function (response) {
                   //console.log(response);
                });
        }
    } ;
});
//Adding custom validation to add  limit in title
app.directive('charLimit', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.length>3) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                 return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
// end of custom validation
app.directive('appFilereader', function($q) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return;

            ngModel.$render = function() {};

            element.bind('change', function(e) {
                var element = e.target;

                $q.all(slice.call(element.files, 0).map(readFile))
                    .then(function(values) {
                        if (element.multiple) ngModel.$setViewValue(values);
                        else ngModel.$setViewValue(values.length ? values[0] : null);
                    });

                function readFile(file) {
                    var deferred = $q.defer();

                    var reader = new FileReader();
                    reader.onload = function(e) {
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function(e) {
                        deferred.reject(e);
                    };
                    reader.readAsDataURL(file);

                    return deferred.promise;
                }

            }); //change

        } //link
    }; //return
});
/*pCtrl.checkId = function($q,$timeout,$http,$route,$location){
    var defer = $q.defer();
    pCtrl.productId = $route.current.params.productId;
    var productData = {};
    $timeout(function(){
       // console.log(this.productId);
        $http.get("model/checkProductById.php?productId="+pCtrl.productId).then(function(data){
            if(data.data.status==1){
                productData = data.data.data;
               // console.log("afterthis");
               // console.log(productData);
                defer.resolve();
                return productData;
            }else{
                //defer.reject();
                $location.path("/");

            }
        });

    },1000)
        defer.promise;
  //  console.log("Here i am");
    //    console.log(productData);
    //return productData;
}*/