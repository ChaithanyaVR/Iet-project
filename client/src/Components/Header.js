import React from 'react'
import './Header.css'
import logo from '../images/preview.jpg'

function Header() {
  return (
    <div className='top-header'>
      <div className='logo'>
      <img src={logo} alt='Logo' />
      </div>
    </div>
  )
}

export default Header