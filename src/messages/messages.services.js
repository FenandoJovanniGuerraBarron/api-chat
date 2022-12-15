const messagesControllers = require('./messages.controllers')

const getAllMessages = (req, res) => {
    const conversationId = req.params.conversation_id
    messagesControllers.findAllMessages(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getMessageById = (req, res) => {
    const id = req.params.message_id
    messagesControllers.findMessageById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const postMessage = (req, res) => {
    const { message } = req.body
    const conversationId = req.params.conversation_id
    const userId = req.user.id
    messagesControllers.createMessage({ userId, conversationId, message })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    message: 'String'
                }
            })
        })
}

const deleteMessage = (req, res) => {
const id = req.params.message_id
messagesControllers.destroyMessage(id)
.then(() => {
    res.status(204).json()
})
.catch((err) => {
    res.status(400).json({message: err.message})
})
}

module.exports={
    getAllMessages,
    getMessageById,
    postMessage,
    deleteMessage
}