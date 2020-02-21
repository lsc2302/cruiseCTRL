const mongoose = require('mongoose');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const UserModel = require('./models/UserModel.js');
const UserSocketModel = require('./models/UserSocketModel.js');


// var logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');


const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let users = new Map();
io.on('connect', function(socket) {
    console.log('a user connected');
    console.log(socket.id);

    socket.on('sendNotifications', function (data) {
        let expertName = data.expertName;
        UserModel.findOne({username: expertName})
            .then(user => {
                if (user) {
                    UserSocketModel.findOne(
                        {username:expertName}).then(user=>{
                        if(user){
                            console.log("user",user.socketId);
                            io.to(user.socketId).emit('receiveNotifications', data);
                        }
                    });
                }
            });
    });

    socket.on('sendChatRequest', function (data) {
        let questionerName = data.questionerName;
        UserModel.findOne({username: questionerName})
            .then(user => {
                if (user) {
                    UserSocketModel.findOne(
                        {username:questionerName}).then(user=>{
                        if(user){
                            io.to(user.socketId).emit('receiveChatRequest', data);
                        }
                    });
                }
            });
    });

    socket.on('sendMessage',function(data){
        let targetName = data.targetName;
        UserModel.findOne({username: targetName})
            .then(user => {
                if (user) {
                    UserSocketModel.findOne(
                        {username:targetName}).then(user=>{
                        if(user){
                            io.to(user.socketId).emit('receiveMessage', data.msg);
                        }
                    });
                }
            });
    });

    socket.on('login', function (data) {
        const {username} = data;
        UserModel.findOne({username: username})
            .then(user => {
                if (user) {
                    users.set(username, socket.id);
                    UserSocketModel.findOneAndUpdate(
                        {username:username},
                        {socketId:socket.id},
                        function() {
                        console.log('user socketId Change!');
                    }).then(user=>{
                        if(!user){
                            UserSocketModel.create({username:username,socketId:socket.id})
                        }
                    });
                    }
                });

    });

    socket.on('sendLeaveNotif',function(data){
        let targetSide = data.targetSide;
        UserModel.findOne({username: targetSide})
            .then(user => {
                if (user) {
                    UserSocketModel.findOne(
                        {username:targetSide}).then(user=>{
                        if(user){
                            io.to(user.socketId).emit('receiveLeaveNotif', data.leaveSide);
                        }
                    });
                }
            });
    })
});

// let uri = 'mongodb://localhost/server_db3';
// let uri = `mongodb://lsc:ku1593574628@cluster0-keqrk.mongodb.net:27017/test?retryWrites=true&w=majority`;
let uri = process.env.MONGODB_URI;
mongoose.connect(uri,{useNewUrlParser:true})
    .then(()=>{
      console.log('successful database connection!');
        app.set('port', process.env.PORT || 3000);
        var server = http.listen(app.get('port'), function() {
            console.log('start at port:' + server.address().port);
        });

        // const io = require('socket.io').listen(app.listen(3000));
      // io.on('connection', function (socket) {
      //     socket.on('login',function(data){console.log('client connect')});
      // });

            // io.sockets.on('login', function () {
        //     console.log('client connect');
            // socket.on('echo', function (data) {
            //     io.sockets.emit('message', data);
            // });
        // });
        app.io = io;
        // app.listen('3000', () => {
      //   console.log('successful launch!')
      // })
    })
    .catch((err)=>{
        console.log(err);
      // console.log('could not launch database!')
    });


app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'lsc-web-app',
    store: new FileStore(),
    saveUninitialized: false,
    genid: function (req) {
        return req.body.username;
    },
    resave: false,
    cookie: { maxAge: 10* 60 * 1000 }
}));

app.use('/', indexRouter);

module.exports = app;
