var app=angular.module('mainApp',['ngRoute','ngResource']);//angular用来控制前台所有页面  mainApp是angular的入口 数据绑定
app.factory('es',['$q','$http',ds.empService]);//用factory创建service   $q 是angular.js用promise
app.controller('mainCtrl',['$scope',function ($scope)//类似于程序的main函数
{

}]);
app.controller('addCtrl',['scope','es','$location',function($scope,es,$location)
{
    $scope.doClear=function(){
        $scope.emp={};
    }
    $scope.doSubmit=function(){
        es.saveOneEmp($scope.emp).then(function(result){//es是service
            $location.path('/home');
        })
    }
}]);

app.controller('homeCtrl',['$scope','es',function($scope,es){
    es.getAllEmp().then(function(res){
        $scope.empList=res;
        }
    );
    $scope.doDelete=function(index){
        var name=$scope.empList[index].name;
        es.deleteOneEmp(name).then(function(){
            $scope.empList.splice(index,1);
        })
    };
}

]);

app.controller('updateCtrl',['scope','es','$location','$routeParams',function($scope,es,$location,$routeParams){
    var name=$routeParams.name;
    es.getOneEmp(name).then(function(resp){
        $scope.emp=resp;
        $scope.originalEmp= angular.copy($scope.emp);
    })
    $scope.doClear=function(){
        $scope.emp=angular.copy($scope.originalEmp);
    }
    $scope.doSubmit=function(){
        es.updateOneEmp($scope.emp).then(function(result){
            $location.path('/home');
        })
    }
}]);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/home',{
        templateUrl:'template/home.html',
        controller:'homtCtrl'
    }).when('/add',{
        templateUrl:'template/add.html',
        controller:'addCtrl'
    }).when('/show',{
        templateUrl:'template/show.html',
    }).when('/update/:name',{
        templateUrl:'template/update.html',
        controller:'updateCtrl'
    }).otherwise({
        redirectTo:'/home'
    })
}]);