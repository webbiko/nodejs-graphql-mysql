const db = require('../../database/config/db')

module.exports = {
    async profiles(parent, args, ctx) {
        ctx && ctx.validateAdmin()
        return await db('profiles')
    },
    async profile(_, { filter }, ctx) {
        ctx && ctx.validateUserFilter(filter)
        const { id, name } = filter

        if (id) {
            return await db('profiles')
                .where({ id })
                .first()
        }

        if (name) {
            return await db('profiles')
                .where({ name })
                .first()
        }
    }
}