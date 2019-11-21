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

app.get('/guilds', db.getGuilds);

app.post('/new_character', db.createCharacter);

app.put('/character/edit/:id', db.updateCharacter);

app.delete('/character/delete/:id', db.deleteCharacter());


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});