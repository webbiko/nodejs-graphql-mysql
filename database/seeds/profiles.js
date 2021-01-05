
exports.seed = function(knex) {
    return knex('profiles').del()
        .then(function () {
            return knex('profiles').insert([
                { name: 'user', label: 'Regular User' },
                { name: 'admin', label: 'Administrator' },
            ]);
        });
};
