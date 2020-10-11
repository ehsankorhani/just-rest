const router = require('express').Router()

const users = require('./../models/users')

router.get('/', (req, res) => {
  //return res.send('GET HTTP method on users resource')
  return res.send(Object.values(users))
});

router.get('/:userId', (req, res) => {
  //return res.send(`GET HTTP method on users/${req.params.userId} resource`)
  return res.send(users[req.params.userId]);
})

router.post('/', (req, res) => {
  return res.send('POST HTTP method on users resource')
})

router.put('/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on users/${req.params.userId} resource`,
  )
})

router.delete('/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on users/${req.params.userId} resource`,
  )
})

module.exports = router