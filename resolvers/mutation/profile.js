const db = require('../../database/config/db')
const { profile: loadProfile } = require('../query/profile')

module.exports = {
    async newProfile(_, { data }, ctx) {
        try {
            ctx && ctx.validateAdmin()

            let profile = await db('profiles')
                .where({ name: data.name })
                .first()

            if(!profile) {
                let [ id ] = await db('profiles')
                    .insert(data)

                profile = await db('profiles').where({ id }).first()
            }

            return profile
        } catch(err) {
            throw new Error(err)
        }
    },
    async deleteProfile(_, args, ctx) {
        ctx && ctx.validateAdmin()

        try {
            let profile = await loadProfile(_, args)

            if(profile) {
                const profileRefId = profile.id
                await db('users_profiles')
                    .where({ profile_id: profileRefId })
                    .delete()

                await db('profiles')
                    .where({ id: profile.id })
                    .delete()
            }

            return profile
        } catch(err) {
            console.log(err.sqlMessage);
        }
    },
    async updateProfile(_, { filter, data }, ctx) {
        ctx && ctx.validateAdmin()
        try {
            let profile = await loadProfile(_, { filter })

            if(profile) {
                await db('profiles')
                    .where({ id: profile.id })
                    .update(data)

                profile = await db('profiles').where({ id: profile.id }).first()
            }

            return profile
        } catch(err) {
            console.log(err.sqlMessage);
        }
    }
}