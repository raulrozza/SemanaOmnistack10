const express = require('express');
const mongoose = require('mongoose');
const { port, mongoUrl } = require('./config');
const routes = require('./routes');

const app = express();

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(port);

console.log("Server running at port "+port);