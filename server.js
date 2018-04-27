
'use strict';
var exec = require('child_process').exec;
var os = require('os');
var nodeStatic = require('node-static');
var fs = require('fs');

var express = require('express');
var app = express();
app.use("/", express.static(__dirname));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var http = require('http').Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html");
});

io.on('connection', function(socket){
    console.log('a user connected '+socket.id);
    socket.on("shibie",function(msg){
      var imageurl = msg['imageurl'];
      if(msg['type']=='internet'){
        exec('python3 detect_faces.py '+imageurl,function(error,stdout,stderr){
          if(stdout.length >1){
              socket.emit("shibie",{"result":stdout});
          } else {
              console.log('you don\'t offer args');
          }
          if(error) {
              console.info('stderr : '+stderr);
          }
        });
      }else{
        var imgData = msg["imagedata"];
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        fs.writeFile("./images/face.png", dataBuffer, function(err) {
          if(err){
          }else{
            // imageurl = "http://h.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a29a2a71cae9225bc315c607c67.jpg"
            imageurl = "https://facerecog1.chinacloudsites.cn/images/face.png";
            exec('python3 detect_faces.py '+imageurl,function(error,stdout,stderr){
              if(stdout.length >1){
                  socket.emit("shibie",{"result":stdout});
              } else {
                  console.log('you don\'t offer args');
              }
              if(error) {
                  console.info('stderr : '+stderr);
              }
            });
          }  
          });
      }
    });





    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

var port = process.env.PORT || 1337;

http.listen(port, function(){
    console.log('listening on *:'+port);
  });
 