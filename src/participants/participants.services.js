const participantsControllers = require('./participants.controllers')

const postParticipant = (req, res) => {
    const { conversationId, userId } = req.body
    participantsControllers.createParticipant({ conversationId, userId })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    conversationId: 'uuid',
                    userId: 'uuid'
                }
            })
        })
}

const deleteParticipant = (req, res) => {
    const id = req.params.participant_id
    participantsControllers.destroyParticipant(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    postParticipant,
    deleteParticipant
}