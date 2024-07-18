import React, { useState, useRef } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import { Chat } from './components/Chat'
const cookies = new Cookies()
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [rooms, setRooms] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut =  async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRooms(null)
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <>
      {rooms ?
         <Chat rooms={rooms}/> :
        (<div className='room'> <label>Enter Room Name</label>
          <input ref={roomInputRef} />
          <button onClick={()=> setRooms(roomInputRef.current.value)}>Enter Chat</button>
        </div>)
      }
      
      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>

    </>
  )
}

export default App
