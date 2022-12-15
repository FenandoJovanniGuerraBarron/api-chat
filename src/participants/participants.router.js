const router = require('express').Router()
const passportJWT = require('../middlewares/auth.middleware')
const participantsServices= require('./participants.services')
const ownerValidate = require('../middlewares/ownerValidate.middleware')


router.post('/participants',passportJWT.authenticate('jwt',{session:false}),participantsServices.postParticipant)
router.delete('/participants/:participant_id',passportJWT.authenticate('jwt',{session:false}),ownerValidate,participantsServices.deleteParticipant)

module.exports = router