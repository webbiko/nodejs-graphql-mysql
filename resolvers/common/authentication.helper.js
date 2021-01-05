const jwt = require('jwt-simple')
const { profiles: loadProfiles } = require('../type/user')

module.exports = {
    async getUserLoggedIn(user) {
        const profiles = await loadProfiles(user)
        const now = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            profiles: profiles.map(p => p.name),
            iat: now,
            exp: now + (3 * 24 * 60 * 60)
        }


        return {
            ...userInfo,
            token: jwt.encode(userInfo, process.env.AUTH_SECRET)
        }
    }
}