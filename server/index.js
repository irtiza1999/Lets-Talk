import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Pusher from 'pusher'
import Messages from './dbMessages.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.port || 5000

const pusher = new Pusher({
  appId: process.env.PUSHER_API_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap1',
  useTLS: true,
})
const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gi4fd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.once('open', () => {
  console.log('Db connected!!')
  const msgCollection = db.collection('messages')
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      })
    } else {
      console.log('Error triggering pusher')
    }
  })
})

app.get('/', (req, res) => {
  res.status(200).send('Server on')
})

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get('/key', (req, res) => res.send(process.env.PUSHER_KEY))

app.listen(port, () => console.log(`Listing on ${port}`))
