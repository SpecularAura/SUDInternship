const express = require("express");
const bodyparser = require('body-parser');
const path = require("path");
const routes = require('./api/send-email')

const app = express();

app.use(express.static('/public/'))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log("Here");
})
app.use('/api/send-email')
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port 3000`);
  });