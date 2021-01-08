import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import './Chat.css'
import {
  SearchOutlined,
  MoreVert,
  AttachFile,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons'
import fireDb from '../../firebase'
import firebase from 'firebase'

const Chat = () => {
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue()

  const [seed, setSeed] = useState('')
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  useEffect(() => {
    if (roomId) {
      fireDb
        .collection('Rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name))

      fireDb
        .collection('Rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [roomId])

  const sendMessage = async (e) => {
    e.preventDefault()
    // await axios.post('/messages/new', {
    //   message: input,
    //   name: 'ishad',
    //   timestamp: new Date().toLocaleTimeString(),
    //   received: true,
    // })

    fireDb.collection('Rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{' '}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && 'chat__receiver'}`}
          >
            <span className="chat__name">{message.name} </span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div> */}

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message  ${
              message.name === user.displayName && 'chat__receiver'
            }`}
          >
            <span className="chat__name">{message.name} </span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
