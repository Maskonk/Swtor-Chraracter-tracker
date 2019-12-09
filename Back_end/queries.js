const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "swtor",
    password: "apples",
    port: 5432
});

const getCharacters = (request, response) => {
    pool.query('SELECT characters.id character_id, characters.character_name, classes.id class_id, classes.class_name, role, level, ' +
        'social_rank, valor_rank, renown_rank, guilds.id guild_id, guilds.guild_name, factions.id faction_id, factions.faction_name ' +
        'FROM characters join guilds on characters.guild = guilds.id join classes on characters.class = classes.id ' +
        'join factions on classes.faction = factions.id ORDER BY characters.character_name;', (error, results) => {
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

const updateCharacter = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, class_name, role, level, renown_rank, social, valor, guild } = request.body;
    console.log(request.body);
    pool.query(
        'UPDATE characters SET character_name = $1, class = $2, role=$3, level=$4, renown_rank=$5, social_rank=$6, valor_rank=$7, guild=$8' +
        ' WHERE id = $9',
        [name, class_name, role, level, renown_rank, social, valor, guild, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const deleteCharacter = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM characters WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};

const getParses = (request, response) => {
    pool.query('SELECT parses.id, characters.character_name, classes.class_name, specs.spec_name, dps FROM parses ' +
        'JOIN characters on parses.character = characters.id JOIN specs on parses.spec = specs.id ' +
        'JOIN classes on specs.class_id = classes.id;', (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json(error)
        }
        else {
            response.status(200).json(results.rows)
        }})
};

const createParse = (request, response) => {
    const { character_id, spec_id, dps } = request.body;

    pool.query('INSERT INTO parses (character, spec, dps)' +
        ' VALUES ($1, $2, $3)', [character_id, spec_id, dps],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.insertId}`)
        })
};

module.exports = {getCharacters, getClasses, getGuilds, createCharacter, updateCharacter, deleteCharacter, getParses};
