const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({Test: "test successful!"})
});

app.get('/characters', db.getCharacters);

app.get('/classes', db.getClasses);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});