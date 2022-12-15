const router = require('express').Router()

const passportJWT = require('../middlewares/auth.middleware')
const messageServices = require('./messages.services')

router.route('/')
.get(passportJWT.authenticate('jwt',{session:false}),messageServices.getAllMessages)
.post(passportJWT.authenticate('jwt',{session:false}),messageServices.postMessage)

router.route('/:message_id')
.get(passportJWT.authenticate('jwt',{session:false}),messageServices.getMessageById)
.delete(passportJWT.authenticate('jwt',{session:false}),messageServices.deleteMessage)

module.exports = router