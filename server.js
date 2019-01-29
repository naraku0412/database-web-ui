var express = require('express'); 
var http = require('http'); 
var app = express();
var url = require("url");
var port = 8888; 
var callfile = require('child_process'); 
var fs = require('fs');

http.createServer(app).listen(port); 
app.get('/get',function(req,res){ 
         var url_parts = url.parse(req.url,true); 
         var query = url_parts.query; 
         var key = query.key;
//       res.send('the input key: ' + key );
         callfile.execFile('/usr/local/bin/get',['-k',key],null,function (error, stdout, stderr) {
         if (error !== null) {
             console.log('exec error: ' + error);
          }
         console.log('exec result: ' + stdout); 
         res.send("the read process is completed!" +stdout);
         });
}); 
app.get('/put',function(req,res){ 
         var url_parts = url.parse(req.url,true); 
        // console.log(url_parts);
         var query = url_parts.query; 
         ///console.log(query);
         var key = query.key;
         var value = query.value;
         //res.send('the input key: ' + key );
         //res.send('the input value: ' + value );
         callfile.execFile('/usr/local/bin/put',['-k',key,'-v',value],null,function (error, stdout, stderr) {
              if (error !== null) {
                  console.log('exec error: ' + error);
               }
         console.log('exec result: ' + stdout); 
         res.send("the input process is completed!" +stdout);
           });
});
