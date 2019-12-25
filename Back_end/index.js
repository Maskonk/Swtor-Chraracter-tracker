const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/characters', db.getCharacters);

app.get('/classes', db.getClasses);

app.get('/guilds', db.getGuilds);

app.get('/specs', db.getSpecs);

app.post('/characters', db.createCharacter);

app.put('/characters/:id', db.updateCharacter);

app.delete('/characters/:id', db.deleteCharacter);

app.get('/parses', db.getParses);

app.post('/parses', db.createParse);

app.put('parse/:id', db.updateParse);

app.delete('parse/:id', db.deleteParse);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});