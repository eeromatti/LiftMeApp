import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import './styles.css'

import CarPool from './components/carpool/CarPool'
import Header from './components/carpool/Header'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import { AppContext } from './AppContext'

const App = () => {  

  const { user } = useContext(AppContext)

  
  if (user === null) {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    )
  }

  if (user !== null) {
    return (
      <div className='app-container'>    
        <Router>
          <Routes>
            <Route path="/" element={<><Header /><CarPool /></>} />
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App
