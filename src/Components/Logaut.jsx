import React, { useState } from 'react'
import { Register } from '../Register/Register'
import { Login } from '../Register/Login'

export const Logaut = ({setProfile, listprofile}) => {

  const [reg, setReg] = useState(false)

  return (
    <div className='logaut'>
        {!reg ? <Register setReg={setReg} setProfile={setProfile} listprofile={listprofile} /> : <Login setReg={setReg} setProfile={setProfile} listprofile={listprofile} />}
        <nav style={{position: "absolute", top: "2em", left: "50%", transform: "translateX(-50%)"}} className='header-name'>BaumanDates</nav>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
    </div>
  )
}
