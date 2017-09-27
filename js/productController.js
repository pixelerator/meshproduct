app.controller("productController",function($scope, $http){
    $scope.model = {
        message:"Hello World from products"
    };
    $scope.formValid = false;
    $scope.$watch('productForm', function() {
        console.info('productForm watch');
        console.log($scope.formValid);
    });
    $scope.model.products = {};
    $scope.model.currentProduct = {};
    $scope.addProduct = function(){
        if($scope.formValid){
            $scope.model.currentProduct =
                    {
                        productName : $scope.productName,
                        productDescription: $scope.productDescription

                    };
            console.log($scope.model.currentProduct);


            $http.post('model/save_product_json.php', $scope.model.currentProduct)
                .then(
                function (response) {
                    console.log(response);
                },
                function (response) {
                   console.log(response);
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