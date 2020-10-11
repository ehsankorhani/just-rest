const express = require('express')
const helmet = require('helmet')
const config = require('dotenv').config

const users = require('./models/users')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

const PORT = 3000 || process.env.PORT

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use((req, res, next) => {
  req.newProp = users[1];
  return next();
});

app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

app.get('/', (req, res) => {
  return res.send(`welcome to express`)
})

app.listen(PORT, () => {
  console.log(`express is running on port ${PORT}`)
})