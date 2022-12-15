const router = require('express').Router()
const passportJWT = require('../middlewares/auth.middleware')
const participantsServices= require('./participants.services')
const ownerValidate = require('../middlewares/ownerValidate.middleware')


router.post('/',passportJWT.authenticate('jwt',{session:false}),participantsServices.postParticipant)
router.delete('/:participant_id',passportJWT.authenticate('jwt',{session:false}),ownerValidate,participantsServices.deleteParticipant)

module.exports = router