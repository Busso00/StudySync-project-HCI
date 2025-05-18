'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { router } = require('./routes.js');

const app = express();
const port = 443;


const http = require('http');
const {Server} = require('socket.io');

const corsOptions = {
  origin: ['https://studysync-project.onrender.com:443'],
  optionsSuccessStatus: 200,
}



const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, { cors: corsOptions });

// Socket config


// Define Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle a simple message event
  socket.on('message', (data) => {
    console.log('Received message:', data);
    // Broadcast the received message to all clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// set up middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use(cors(corsOptions));

app.use('/static', express.static('public'));

app.use('/api', router);

const NODE_ENV = 'production';

// Serve static files from the React app
if (NODE_ENV === 'production') {
  console.log("in production")
  // Serve the React frontend in production
  app.use(express.static('../client/build'));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile('../client/build/index.html');
  });
}
else{
  console.log("not in production")
}


server.listen(port, () => console.log(`Socket.io server started on port ${port}`));
