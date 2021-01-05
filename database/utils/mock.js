const db = require('../config/db')
const { getUserLoggedIn } = require('../../resolvers/common/authentication.helper')

const sql = `
    select
        u.*
    from
        users u,
        users_profiles up,
        profiles p
    where
        up.user_id = u.id and
        up.profile_id = p.id and
        u.active = 1 and
        p.name = :profileName
    limit 1
`

const getUserBy = async profileName => {
    const res = await db.raw(sql, { profileName })
    return res ? res[0][0] : null
}

module.exports = async req => {
    const user = await getUserBy('admin')
    if(user) {
        const { token } = await getUserLoggedIn(user)
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}