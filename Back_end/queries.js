const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "swtor",
    password: "apples",
    port: 5432
});

const getCharacters = (request, response) => {
    pool.query('SELECT characters.id, characters.character_name, classes.class_name, guilds.guild_name, factions.faction_name, ' +
        'role, level, social_rank, valor_rank, renown_rank FROM characters ' +
        'join guilds on characters.guild = guilds.id join classes on characters.class = classes.id ' +
        'join factions on classes.faction = factions.id;', (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json(error)
        }
        else {
            response.json(results.rows)
        }})
};

module.exports = {getCharacters};