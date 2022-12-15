const uuid = require('uuid')

const Participants = require('../models/participants.models')

const createParticipant = async(obj)=>{
    const data = await Participants.create({
        id:uuid.v4(),
        conversationId:obj.conversationId,
        userId:obj.userId
    })
    return data
}

const destroyParticipant = async(id)=>{
    const data = await Participants.destroy({
        where:{
            id:id
        }
    })
    return data
}


module.exports={
createParticipant,
destroyParticipant
}







