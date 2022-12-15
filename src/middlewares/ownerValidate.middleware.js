const {findConversationById} = require('../conversations/conversations.controllers')


const ownerValidate = (req,res,next)=>{
    const conversationId = req.params.conversation_id
    const userId = req.user.id
    findConversationById(conversationId)
    .then(data=>{
        if (data.user.id == userId ) {
            next()
        }else{
            res.status(400).json({message: 'Only the owner can delete it'})
        }
    })
    .catch(err=> res.status(400).json({message: err.message}))
}


module.exports = ownerValidate