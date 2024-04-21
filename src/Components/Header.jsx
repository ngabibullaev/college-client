import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const Header = ({profile}) => {

  return (
    <div className='Header'>
        <div className='img-phone'>

        <Container>
            <div className='navbar'>
            <NavLink to={"/home"}><nav className='header-name'>BaumanDates</nav></NavLink>
                <div className='navbar text-light'>
                  <b className='mx-2'>{profile.name}</b>
                  <div className="img-width2">
                  <NavLink to={"/MeProfile"}><img className='img-section2' src={profile.imgUrl} alt="" /></NavLink>
            
          </div>
                </div>
            </div>
        </Container>
        </div>
    </div>
  )
}
