const uuid = require('uuid')

const Messages = require('../models/messages.models')
const Users = require('../models/users.models')
const Conversations = require('../models/conversations.models')

const findAllMessages = async (id) => {
    const data = await Messages.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt','userId','conversationId']
        },
        where:{
            conversationId:id
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['email', 'password', 'createdAt', 'updatedAt','status','role','gender','birthday','isVerified']
                }
            },
            {
                model: Conversations,
                attributes: {
                    exclude: [ 'createdAt', 'updatedAt']
                }
            }
        ]
    })
    return data
}

const findMessageById = async (id) => {
    const data = await Messages.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt','userId','conversationId']
        },
        where: {
            id: id
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['email', 'password', 'createdAt', 'updatedAt','status','role','gender','birthday','isVerified']
                }
            },
            {
                model: Conversations,
                attributes: {
                    exclude: [ 'createdAt', 'updatedAt']
                }
            }
        ]
    })
    return data
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

const destroyMessage= async(id)=>{
    const data = await Messages.destroy({
        where:{
            id:id
        }
    })
    return data
}



module.exports = {
    findAllMessages,
    findMessageById,
    createMessage,
    destroyMessage
}