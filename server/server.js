global.config = require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

app.use(bodyParser.json());

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
