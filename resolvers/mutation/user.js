const bcrypt = require('bcrypt-nodejs')

const db = require('../../database/config/db')

const { profile: loadProfile } = require('../query/profile')
const { user: loadUser } = require('../query/user')

const mutations = {
    signUp(_, { data }) {
        return mutations.newUser(_, {
            data
        })
    },
    async newUser(_, { data }, ctx) {
        ctx && ctx.validateAdmin()
        try {
            let user = await db('users')
                .where({ email: data.email })
                .first()

            if(!user) {
                const profileIds = []
                if(!data.profiles || !data.profiles.length) {
                    data.profiles = [ {
                        name: 'user'
                    } ]
                }

                for (const filter of data.profiles) {
                    const profile = await loadProfile(_, { filter })

                    if(profile) {
                        profileIds.push(profile.id)
                    }
                }

                data.password = encryptPassword(data.password)

                delete data.profiles
                let [ id ] = await db('users')
                    .insert(data)

                for(let profile_id of profileIds) {
                    await db('users_profiles')
                        .insert({ profile_id, user_id: id })
                }

                user = await db('users')
                    .where({ id })
                    .first()
                return user
            }
            return user
        } catch(err) {
            throw new Error(err.sqlMessage)
        }
    },
    async deleteUser(_, args, ctx) {
        ctx && ctx.validateAdmin()
        try {
            let user = await loadUser(_, args)
            if(user) {
                const userRefId = user.id
                await db('users_profiles')
                    .where({ user_id: userRefId })
                    .delete()

                await db('users')
                    .where({ id: user.id })
                    .delete()
            }

            return user
        } catch(err) {
            throw new Error(err.sqlMessage)
        }
    },
    async updateUser(_, { filter, data }, ctx) {
        ctx && ctx.validateUserFilter(filter)
        try {
            let user = await loadUser(_, { filter })
            if(user) {
                const userRefId = user.id

                if (ctx.admin && data.profiles) {
                    await db('users_profiles')
                        .where({ user_id: userRefId })
                        .delete()

                    for (const profile of data.profiles) {
                        let loadedProfile = null
                        if (profile.id) {
                            loadedProfile = await db.from('profiles')
                                .where({ id: profile.id })
                                .first()
                        } else if (profile.name) {
                            loadedProfile = await db.from('profiles')
                                .where({ name: profile.name })
                                .first()
                        }

                        if (loadedProfile) {
                            await db('users_profiles').insert({
                                profile_id: loadedProfile.id,
                                user_id: userRefId
                            })
                        }
                    }
                }

                data.password = encryptPassword(data.password)

                delete data.profiles
                await db('users')
                    .where({ id: user.id })
                    .update(data)

                user = await db('users')
                    .where({ id: user.id })
                    .first()
            }

            return user
        } catch(err) {
            throw new Error(err.sqlMessage)
        }
    }
}

function encryptPassword(password) {
    if(password) {
        const salt = bcrypt.genSaltSync()
        return bcrypt.hashSync(password, salt)
    }
}

module.exports = mutations