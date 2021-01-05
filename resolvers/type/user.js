const db = require('../../database/config/db')

module.exports = {
    async profiles(user) {
        return await db('profiles')
            .join('users_profiles', 'profiles.id', 'users_profiles.profile_id')
            .where({ user_id: user.id })
    }
}