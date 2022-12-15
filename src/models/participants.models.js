const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const Users = require('./users.models')
const Conversations = require('./conversations.models')

const Participants = db.define('participants',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Conversations
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
        }
    }
})

module.exports = Participants