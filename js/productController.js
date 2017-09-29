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
    $scope.productError = false;
    $scope.productErrorList = [];
    $scope.addProduct = function(){
        if($scope.formValid){
            $scope.model.currentProduct =
                    {
                        productName : $scope.productName,
                        productDescription: $scope.productDescription,
                        productImage : $scope.productImage

                    };
            console.log($scope.model.currentProduct);


            $http.post('model/save_product_json.php', $scope.model.currentProduct)
                .then(
                function (response) {
                    $scope.productErrorList = [];
                    $scope.productError = false;
                     //console.log(response.data);
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