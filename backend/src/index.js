const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { port, mongoUrl } = require('./config');
const { setupWebSocket } = require('./websocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(port);

console.log("Server running at port "+port);