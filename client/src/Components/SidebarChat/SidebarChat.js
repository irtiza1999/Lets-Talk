import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './SidebarChat.css'
import fireDb from '../../firebase'

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState('')
  const [messages, setMessages] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  useEffect(() => {
    if (id) {
      fireDb
        .collection('Rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt('Please enter a name for the chat room')

    if (roomName) {
      fireDb.collection('Rooms').add({
        name: roomName,
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p style={{ color: 'gray' }}>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={() => createChat()} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
