import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import { auth, provider } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import { actionTypes } from '../../reducer'

const Login = () => {
  const [{}, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        })
      })
      .catch((err) => alert(err.message))
  }
  return (
    <div className="login">
      <div className="login__container">
        <MessageIcon style={{ color: 'green', alignItems: 'center' }} />
        <div className="login__text">
          <h1>Sign in to Let's Chat</h1>
        </div>
        <Button type="submit" onClick={() => signIn()}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
