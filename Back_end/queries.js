const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "swtor",
    password: "apples",
    port: 5432
});

const getCharacters = (request, response) => {
    pool.query('SELECT characters.id character_id, characters.character_name, classes.class_name, role, level, ' +
        'social_rank, valor_rank, renown_rank, guilds.id guild_id, guilds.guild_name, factions.id faction_id, factions.faction_name ' +
        'FROM characters join guilds on characters.guild = guilds.id join classes on characters.class = classes.id ' +
        'join factions on classes.faction = factions.id;', (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json(error)
        }
        else {
            response.status(200).json(results.rows)
        }})
};

const getClasses = (request, response) => {
    pool.query('SELECT id, class_name FROM classes;', (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json(error)
        }
        else {
            response.status(200).json(results.rows)
        }})
};

const getGuilds = (request, response) => {
    pool.query('SELECT id, guild_name FROM guilds;', (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json(error)
        }
        else {
            response.status(200).json(results.rows)
        }})
};

const createCharacter = (request, response) => {
    const { name, class_name, role, level, renown_rank, social, valor, guild} = request.body;

    pool.query('INSERT INTO characters (character_name, class, role, level, renown_rank, social_rank, valor_rank, guild)' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, class_name, role, level, renown_rank, social, valor, guild],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};

module.exports = {getCharacters, getClasses, getGuilds, createCharacter};