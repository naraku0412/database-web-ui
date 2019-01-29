var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var path =require('path');
var readline = require('readline');
var fs = require('fs');
var url = require('url');

/* 登陆界面*/
router.get('/', function(req, res, next) {
  res.render('mainpageV2');
});

/* 数据读取界面*/
router.get('/getw', function(req, res, next) {
  res.render('getV2');
});
/* 数据获取 */
router.post('/getw', function(req, res, next) {

  var key = req.body['key'];
  //定义参数
  var K = '-k';

 child_process.exec('/usr/local/bin/get'+' '+K+' '+key+' ',function(err,stdout,stderr){ 
    if(err){
      console.log(err);
      var getV = `${err}`;
    }else if(stderr){
      console.log(stderr);
      var getV = `${stderr}`;
    }else if(stdout){
      console.log(stdout);
      //console.log(`stdout: ${stdout}`);
      var getV = `${stdout}`;
      if(getV.indexOf(",") !==-1){
        getV = getV.split(",");
        getV = getV[1];
        }else{ 
          getV = getV;}
    }else{
      console.log('other...');
      var getV = "";
      getV = "键不存在，请输入正确键！";
    }
  //字符串拼接成str = {'key':'hello.world'}形式
  /*  if(getV == ""){
      getV = "键不存在";
     }else if(getV.indexOf(",") !==-1){
      getV = getV.split(",");
      getV = getV[1];
     }else{
      getV = getV;
     }
  */
  var pre = "output";
  datax = {};
  datax[pre] = getV;
  
 //数据输出展示界面 
  res.render("showV2",datax);
 });
});


/* 数据写入界面*/
router.get('/putw', function(req, res, next) {
  res.render('putV2');
});

/* GET home page. */
router.post('/putw', function(req, res, next) {

  //定义参数
  var key = req.body['key'];
  var K = '-k';
  var value = req.body['value'];
  var V = '-v';
  
 //res.send('the input key: ' + key  );
 child_process.exec('/usr/local/bin/put'+' '+K+' '+key+' '+V+' '+value+' ',function(err,stdout,stderr){ 
   if(err){
      console.log(err);
      var getP = `${err}`;
    }else if(stderr){
      console.log(stderr);
      var getP = `${stderr}`;
    }else if(stdout){
      console.log(stdout);
      var getP =`${stdout}`;
      getP =  getP.replace(/\s+/g,"");
      if (getP == "success"){
        getP = "数据写入成功";
      }else{
        getP = "数据写入失败"; 
       }
    }else{
      console.log('other...');
      var getP = "数据写入失败";
    }
  //字符串拼接成str = {'key':'hello.world'}形式
  var pre = "output";
  datax = {};
  datax[pre] = getP;
 //数据输出展示界面 
  res.render("wShowV2",datax);
  });

});


router.get('/get', function(req, res, next) {
      K = '-k';
      var url_parts = url.parse(req.url,true);
      var query = url_parts.query;
      var key = query.key;
      //console.log(key);
     child_process.exec('/usr/local/bin/get'+' '+K+' '+key+' ',function(err,stdout,stderr){
       if(err){
        console.log(err);
        var getP = `${err}`;
       }else if(stderr){
        console.log(stderr);
        var getP = `${stderr}`;
       }else if(stdout){
        console.log(stdout);
       var getP = `${stdout}`;
         if(getP.indexOf(",") !==-1){
          getP = getP.split(",");
          getP = getP[1];
         }else{ 
          getP = getP;}
        }else{
        console.log('other...');
        var getP = "other";
      }
   res.send('The output value is:' +getP);
   });
  
});

router.get('/post', function(req, res, next) {
      K = '-k';
      V = '-v';
      var url_parts = url.parse(req.url,true);
      var query = url_parts.query;
      var key = query.key;
      var value = query.value;
    
      child_process.exec('/usr/local/bin/put'+' '+K+' '+key+' '+V+' '+value+' ',function(err,stdout,stderr){ 
        if(err){
        console.log(err);
        var getP = `${err}`;
        }else if(stderr){
        console.log(stderr);
        var getP = `${stderr}`;
        console.log(stderr);
        }else if(stdout){
        console.log(stdout);
        var getP = `${stdout}`;
        //console.log(getP);
       // getP = String(getP);
       //getP ="success";
        getP =  getP.replace(/\s+/g,"");
        var testV = "success";
           if(getP == testV){
             getP = getP;
           }else
            { getP = "failed";}
        }else{
        console.log('other...');
        var getP = "other";
       }  
         res.send("The write result is:" +getP);
         
         });
});

   


module.exports = router;
