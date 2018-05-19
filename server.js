// Written by Zhouce
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const es=require('./routes/empservice');

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/rest/es',es);//前台发后台的请求地址

app.listen(app.get('port'),()=>{//es6 的新features  arrow function
    console.log('server');
});