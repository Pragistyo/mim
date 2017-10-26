const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const postingRoute = require('./routes/postingRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/posts', postingRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000');
});
