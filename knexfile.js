// Update with your config settings.

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        user:     process.env.DATABASE_USER_NAME,
        password: process.env.DATABASE_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './database/migrations'
    },
    seeds: {
        directory: './database/seeds'
    }
};
