const express = require("express");
const cors = require('cors');
const http = require('http');
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());

const httpServer=http.createServer(app);
const { Server } = require("socket.io");
const io= new Server(httpServer,{
cors:{
origin:'http://localhost:5173',
methods:['GET','POST']},
});

io.on('connection',(socket)=>{
    console.log('new user connected to our app');
    
    socket.on('disconnect',(socket)=>{
        console.log('user disconnect');
    });
//     // socket.send('hello world cup 2022');
//     // socket.on('test',(data)=>{
//     //   console.log(data)
//     // });
//     io.sockets.emit('fifaWorld','hello Football');
socket.on('joinRoom',(data)=>{
  socket.join(data);
});
socket.on('reactEvent',(data)=>{
  
  // socket.broadcast.emit('showMessage',data);
  socket.to(data.room).emit('showMessage',data);
});


}); 

// let fifa =io.of('/worldCup');

// fifa.on('connection',(socket)=>{
//   fifa.emit('worldCupEvent','hello fifa from PP');
// });
// let icc =io.of('/cricketCup');

// icc.on('connection',(socket)=>{
//   icc.emit('cricketCupEvent','hello icc from PP');
// });




app.get("/", (req, res) => {
  res.sendFile(__dirname +"/app.html");
});


httpServer.listen(port,function () {
console.log('hello socket io')
});    