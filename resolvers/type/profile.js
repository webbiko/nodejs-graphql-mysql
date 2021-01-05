const db = require('../../database/config/db')

module.exports = {
    async users(profile) {
        return await db('users')
            .join('users_profiles', 'users.id', 'users_profiles.user_id')
            .where({ profile_id: profile.id })
    }
}