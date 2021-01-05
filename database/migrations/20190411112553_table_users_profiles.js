
exports.up = function(knex) {
    return knex.schema.createTable('users_profiles', table => {
        table.integer('user_id').unsigned()
        table.integer('profile_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.foreign('profile_id').references('profiles.id')
        table.primary([ 'user_id', 'profile_id' ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users_profiles')
};
