const db = require('../../database/config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUserLoggedIn } = require('../common/authentication.helper')

module.exports = {
    async login(_, { data }) {
        const user = await db('users')
            .where({ email: data.email })
            .first()

        if (!user) {
            throw new Error('User/Password invalid')
        }

        const isSamePassword = bcrypt.compareSync(data.password, user.password)

        if (!isSamePassword) {
            throw new Error('User/Password invalid')
        }

        return getUserLoggedIn(user)
    },
    async users(parent, args, ctx) {
        ctx && ctx.validateAdmin()
        return await db('users')
    },
    async user(_, { filter }, ctx) {
        ctx && ctx.validateUserFilter(filter)
        const { id, email } = filter

        if (id) {
            return await db('users')
                .where({ id })
                .first()
        }

        if (email) {
            return await db('users')
                .where({ email })
                .first()
        }
    }
}