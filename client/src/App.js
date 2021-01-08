import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Chat from './Components/Chat/Chat'
import Sidebar from './Components/Sidebar/Sidebar'
import Login from './Components/Login/Login'
import { useStateValue } from './StateProvider'

function App() {
  // const [messages, setMessages] = useState([])
  // const [user_key, setUserKey] = useState('')

  // useEffect(() => {
  //   axios.get('/messages/sync').then((res) => {
  //     setMessages(res.data)
  //   })
  // }, [])

  // useEffect(() => {
  //   axios.get('/key').then((res) => {
  //     setUserKey(res.data)
  //   })
  // }, [])

  // useEffect(() => {
  //   const pusher = new Pusher(`${user_key}`, {
  //     cluster: 'ap1',
  //   })

  //   const channel = pusher.subscribe('messages')
  //   channel.bind('inserted', (newMessage) => {
  //     setMessages([...messages, newMessage])
  //   })

  //   return () => {
  //     channel.unbind_all()
  //     channel.unsubscribe()
  //   }
  // }, [messages])

  const [{ user }, dispatch] = useStateValue()

  return (
    <Router>
      <Switch>
        <div className="app">
          {!user ? (
            <Login />
          ) : (
            <div className="app__body">
              <Sidebar />
              {/* <Route path="/">{<Chat />}</Route> */}
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </div>
          )}
        </div>
      </Switch>
    </Router>
  )
}

export default App
