var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname,"public")));

var port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log("server on!");
});
//document.body.appendChild()
var objects = new Array();
io.on('connection', function(socket){
    console.log('user connected : ', socket.id);

    socket.on('login', function(name){
        var object = {'id' : socket.id, 'name' : name};
        objects.push(object);
        io.emit('update list', objects, object);
    });

    socket.on('disconnect', function(){
        objects.splice(objects.findIndex(function(element){
            return element['id'] == socket.id;
        }),1);
        io.emit('update list', objects);
        console.log('user disconnected : ', socket.id);

    });
});
