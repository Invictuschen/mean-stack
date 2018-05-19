(function(global){
    var ds = {};

    ds.empservice = function( $q, $http){//$q 是angularjs专门用来发ajaxcall和promise的关键字  解析后台传来的json
        var url= '/rest/es/emp';//后台restful的地址
        return{
            getAllEmp: function(){
                var defer = $q.defer();
                $http.get(url).then(function(resp){
                    defer.resolve(resp.data);
                });
                return defer.promise;
            },
            deleteOneEmp:function(name){
                var defer = $q.defer();
                $http.delete(url+'/'+name).then(function(resp){
                    defer.resolve(resp.data);
                })
                return defer.promise;
            },
            getOneEmp:function(name)
            {
                var defer= $q.defer();
                $http.get(url+'/'+name).then(function(resp){
                    delete resp.data._id;
                    defer.resolve(resp.data);
                })
                return defer.promise;
            },
            updateOneEmp:function(emp){
                var defer=$q.defer();
                $http.put(rul, emp).then(function(resp){
                    defer.resolve(resp.data);
                })
                return defer.promise;
            },
            saveoneEmp:function(emp){
                var defer = $q.defer();
                $http.post(url, emp).then(function(resp){
                    defer.resolve(resp.data);
                });
                return defer.promise;
            }


        }

    }
    global.ds=ds;
})(window);