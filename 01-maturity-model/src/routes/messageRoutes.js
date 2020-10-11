const router = require('express').Router()
const uuidv4 = require('uuid/v4')

const messages = require('./../models/messages')

router.get('/', (req, res) => {
  return res.send(Object.values(messages))
});

router.get('/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId])
})

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.newProp.id
  };
  messages[id] = message

  return res.send(message)
})

module.exports = router