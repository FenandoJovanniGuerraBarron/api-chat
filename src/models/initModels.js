const Users = require('./users.models')
const Conversations = require('./conversations.models')
const Participants = require('./participants.models')
const Messages = require('./messages.models')
const RecoveryPasswords = require('./recoveryPasswords.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? FK = Conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //? FK = Messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? FK = Participants
    Users.hasMany(Participants)
    Participants.belongsTo(Users)
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
}

module.exports = initModels