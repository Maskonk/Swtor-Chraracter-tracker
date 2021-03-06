const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "swtor",
    password: "apples",
    port: 5432
});

const getCharacters = (request, response) => {
    pool.query('SELECT characters.id character_id, characters.character_name, c.id class_id, c.class_name, ' +
        'role, level, social_rank, valor_rank, renown_rank, guilds.id guild_id, guilds.guild_name, ' +
        'factions.id faction_id, factions.faction_name ' +
        'FROM characters join guilds on characters.guild_id = guilds.id join classes c on characters.class_id = c.id ' +
        'join factions on c.faction = factions.id ORDER BY characters.character_name;', (error, results) => {
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

const getSpecs = (request, response) => {
    pool.query('SELECT specs.id, specs.spec_name, specs.class_id, classes.class_name from specs ' +
        'join classes on specs.class_id = classes.id;', (error, results) => {
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

    pool.query('INSERT INTO characters (character_name, class_id, role, level, renown_rank, social_rank, valor_rank, guild_id)' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, class_name, role, level, renown_rank, social, valor, guild],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Character added with ID: ${results.insertId}`)
    })
};

const updateCharacter = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, class_name, role, level, renown_rank, social, valor, guild } = request.body;
    pool.query(
        'UPDATE characters SET character_name = $1, class_id = $2, role=$3, level=$4, renown_rank=$5, social_rank=$6, valor_rank=$7, guild_id=$8' +
        ' WHERE id = $9',
        [name, class_name, role, level, renown_rank, social, valor, guild, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Character modified with ID: ${id}`)
        }
    )
};

const deleteCharacter = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM characters WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Character deleted with ID: ${id}`)
    })
};

const getParses = (request, response) => {
    pool.query('SELECT parses.id, characters.character_name, classes.class_name, specs.spec_name, dps, date FROM parses ' +
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
    const { character_id, spec_id, dps, date } = request.body;

    pool.query('INSERT INTO parses (character, spec, dps, date)' +
        ' VALUES ($1, $2, $3, $4)', [character_id, spec_id, dps, date],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Parse added with ID: ${results.insertId}`)
        })
};

const updateParse = (request, response) => {
    const id = parseInt(request.params.id);
    const { dps } = request.body;
    console.log(request.body);
    pool.query(
        'UPDATE parses SET dps = $2 WHERE id = $1',
        [id, dps],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Parse modified with ID: ${id}`)
        }
    )
};

const deleteParse = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM parses WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Parse deleted with ID: ${id}`)
    })
};

const parseStats = (request, response) => {
    pool.query('select spec_name, count(*), max(parses.dps), avg(parses.dps) from parses ' +
        'join specs on parses.spec = specs.id group by spec_name order by spec_name',
        (error, results) => {
        if (error) {
            console.log(error);
            response.status(500).json(error)
        }
        else {
            response.status(200).json(results.rows)
        }})
};

const characterCount = (request, response) => {
    pool.query('select class_name, count(*) from characters join classes c2 on characters.class = c2.id ' +
        'group by class_name order by class_name;',
        (error, results) => {
            if (error) {
                console.log(error);
                response.status(500).json(error)
            }
            else {
                response.status(200).json(results.rows)
            }})
};

module.exports = {getCharacters, getClasses, getGuilds, getSpecs, createCharacter, updateCharacter, deleteCharacter,
    getParses, createParse, updateParse, deleteParse, parseStats, characterCount};
