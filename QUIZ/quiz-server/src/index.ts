const express = require('express')
const app = express();
const path = require('path')
const cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const port = 4000;

app.use(cors());
app.get('/', (req, res) => {
  res.send({
    status: 1,
    response: "Welcome to quiz-server"
  });
});

app.post('/login', (req, res) => {
  res.send({
    status: 1,
    response: "you've reached login endpoint!"
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});