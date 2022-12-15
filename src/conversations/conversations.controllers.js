const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')


const findAllMyConversations = async (id) => {
    const data = await Conversations.findAll({
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['email', 'password', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Participants,
                attributes: {
                    exclude: ['conversationId', 'createdAt', 'updatedAt', 'userId']
                },
                where: {
                    userId: id
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['email', 'password', 'createdAt', 'updatedAt', 'gender', 'role', 'status']
                        }
                    }
                ]
            }
        ],
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId']
        },
        where: {
            id: id
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['email', 'password', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Participants,
                attributes: {
                    exclude: ['conversationId', 'createdAt', 'updatedAt', 'userId']
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['email', 'password', 'createdAt', 'updatedAt', 'gender', 'role', 'status']
                        }
                    }
                ]
            }
        ],
    })
    return data
}

const createConversation = async (obj) => {
    const data = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imageUrl: obj.imageUrl,
        userId: obj.userId
    })
    let participant
    let owner
    if (data) {
        participant = await Participants.create({
            id: uuid.v4(),
            conversationId: data.id,
            userId: obj.participantId
        })
    }
    if (participant) {
        owner = await Participants.create({
            id: uuid.v4(),
            conversationId: data.id,
            userId: obj.userId
        })
    }
    if (owner) {
            return data
    }else{
        await Conversations.destroy({
            where: {
                id: data.id
            }
        })
    }
}

const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const destroyConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findAllMyConversations,
    findConversationById,
    createConversation,
    updateConversation,
    destroyConversation
}
