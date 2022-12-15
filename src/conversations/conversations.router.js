const router = require('express').Router()
const passportJWT = require('../middlewares/auth.middleware')
const conversationsServices = require('./conversations.services')
const ownerValidate = require('../middlewares/ownerValidate.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', { session: false }), conversationsServices.getAllMyConversations)
    .post(passportJWT.authenticate('jwt', { session: false }), conversationsServices.postMyConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', { session: false }), conversationsServices.getMyConversationById)
    .patch(passportJWT.authenticate('jwt',{session:false}),conversationsServices.patchMyConversation)
    .delete(passportJWT.authenticate('jwt', { session: false }),ownerValidate,conversationsServices.deleteMyConversation)

    module.exports = router