//相当于后台的controller
const express = require('express');
const  router= express.Router();//后台路由
var ed = require('./dao/empdao');
var MongoClient= require('mongodb').MongoClient;//引入第三方库

var uri = 'mongodb://localhost:27017/Mercury';//

router.get('/emp',(req, res)=> {//后台地址
    MongoClient.connect(uri, (err, db)=>{//promise:可以发ajax call  三种状态  fulfill pending reject  （ajax:用于发异步请求 call)
        ed.getAllEmp(db,(result)=>{
            res.json(result);
            db.close();
        })
    })
})

router.get('/emp/:name',(req, res)=>{
    const_name = req.params.name;
    MongoClient.connect(uri, (err,db)=>
    {
        ed.getOneEmp(db, name,(result)=>
        {
            res.json(result);
            db.close();
        })
    })
})
module.exports = router;