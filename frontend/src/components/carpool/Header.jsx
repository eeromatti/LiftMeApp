import React from 'react'
import Menu from './Menu'


const Header = () => {

  return (
    <div className='header' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <img src='/logo-green.png' alt='Logo' width='200px'/>
      <Menu />
    </div>
  )

}

export default Header