import React from 'react'
import Menu from './Menu'
import Logo from '../../photos/logo-green.png'


const Header = () => {


  return (
    <div className='header' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <img src={Logo} alt='Logo' width='200px'/>
      <Menu />
    </div>
  )

}

export default Header