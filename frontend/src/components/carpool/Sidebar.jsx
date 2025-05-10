 
import React, {  useContext, useState } from 'react'
import '../../styles.css'
import SingleUser from './SingleUser'

import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import HomeIcon from '@mui/icons-material/HomeWorkOutlined'
import WorkIcon from '@mui/icons-material/WorkOutline'
import ClockIcon from '@mui/icons-material/AccessTimeOutlined'
import { AppContext } from '../../AppContext'
import Avatar from '@mui/material/Avatar'
import { Typography, FormLabel, Stack } from '@mui/material'
import Divider from '@mui/material/Divider'

const Sidebar = () => {

  const {  
    allUsers,
    setPickupCoordinates,
    setStartCoordinates,
    user,
    potentialPassengers,
    potentialDrivers,
    activeDays,
    setActiveDays, 
  } = useContext(AppContext)


  const [role, setRole] = useState('drivers')
  const [showingDriver, setShowingDriver] = useState('')


  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole)
      setStartCoordinates(user.homeCoordinates)
      setPickupCoordinates([])
    }
  }

  const handleDaysChange = (event, newDays) => {
    if (newDays.length) {
      setActiveDays(newDays)
    }
  }

  return (
    <div className='sidebar'>

      <Divider sx={{ borderBottomWidth: 1 }} />

      <div className='userinfo'>

       // Detach into own component
        {/* user info table */}
        <Box display="flex" justifyContent="center" paddingTop={2}>
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center'}}>
                  <Avatar src={user.photo} />
                </td>
                <td style={{paddingLeft: 15}}>
                  <Typography style={{fontFamily: 'Helvetica', fontWeight: 'normal', fontSize: '18px', letterSpacing: '2px', color: '#2c2b2b'}}>
                    {user.name}
                  </Typography>
                </td>
              </tr>
              
              <tr>
                <td style={{ textAlign: 'center', paddingTop: 10}}>
                  <HomeIcon sx={{ color: 'action.active', fontSize: 20 }} />
                </td>
                <td  style={{paddingLeft: 15, paddingTop: 10}}>
                  <Typography style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '13px', letterSpacing: '1px', color: '#2c2b2b'}}>
                    {user.homeAddress}
                  </Typography>
                </td>
              </tr>
              
              <tr>
                <td style={{ textAlign: 'center'}}>
                  <WorkIcon sx={{ color: 'action.active', fontSize: 18 }} />
                </td>
                <td  style={{paddingLeft: 15}}>
                  <Typography style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '13px', letterSpacing: '1px', color: '#2c2b2b'}}>
                    {user.workAddress}
                  </Typography>
                </td>
              </tr>

              <tr>
                <td style={{ textAlign: 'center'}}>
                  <ClockIcon sx={{ color: 'action.active', fontSize: 18 }} />
                </td>
                <td  style={{paddingLeft: 15}}>
                  <Typography style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '13px', letterSpacing: '1px', color: '#2c2b2b', }}>
                    ~ {(user.time / 60).toFixed()} min
                  </Typography>  
                </td>
              </tr>

            </tbody>
          </table>
        </Box>
      
// Detach into own component, which handles days state
        {/* weekdays */}
        <Stack sx={{ width: '100%', alignItems: 'center' }}> 
          <Stack sx={{ width: 'fit-content', alignItems: 'flex-start' }}> 
            <FormLabel
              component="legend"
              sx={{
                paddingTop: 2,
                paddingLeft: 1.7,
                fontFamily: 'Helvetica',
                fontSize: 13,
                letterSpacing: '1px',
                color: '#868686',
                alignSelf: 'start',
              }}
            >
              Your commute days
            </FormLabel>

            <ToggleButtonGroup
              color="primary"
              size="small"
              value={activeDays}
              onChange={handleDaysChange}
              sx={{
                backgroundColor: '#f8f6ed',
                display: 'flex',
                paddingTop: 1,
                paddingLeft: 1,
                paddingRight: 1,
                alignItems: 'center',
                justifyContent: 'center', 
                gap: 0.5,
                width: 'fit-content',
              }}
            >
              {['Mo', 'Tu', 'We', 'Th', 'Fr'].map((day) => (
                <ToggleButton
                  key={day}
                  value={day}
                  sx={{
                    borderRadius: '10px',
                    px: 2.4,
                    fontSize: '14px',
                    fontFamily: 'Helvetica',
                    textTransform: 'lowercase',
                  }}
                >
                  {day}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        </Stack>

// Detach into own component, which also handles the state of the role
        {/* role */}
        <Stack sx={{ width: '100%', alignItems: 'center' }}>
          <Stack sx={{ width: 'fit-content', alignItems: 'flex-start' }}> 
            <FormLabel component="legend" sx={{ 
              paddingLeft: 1, 
              paddingTop: 2, 
              fontFamily: 'Helvetica', 
              fontSize: 13, 
              letterSpacing: '1px', 
              color: '#868686',
              alignSelf: 'start',
            }}>
              Looking for drivers or passengers?
            </FormLabel>
            <ToggleButtonGroup
              color="primary"
              value={role}
              exclusive
              onChange={handleRoleChange}
              size="small"
              aria-label="text formatting"
              sx={{ 
                backgroundColor: '#f8f6ed', 
                paddingLeft: 0, 
                paddingTop: 1, 
                paddingBottom: 2, 
                display: 'flex', 
                gap: 0.5, 
                justifyContent: 'center',
                width: 'fit-content',
              }} 
            >
              <ToggleButton 
                value="drivers" 
                sx={{ 
                  borderRadius: '10px',
                  px: 2.4, 
                  fontSize: '14px', 
                  fontFamily: 'helvetica',
                  textTransform: 'lowercase', 
                  letterSpacing: '1px',
                  width: 142
                }}
              >
                drivers
              </ToggleButton>

              <ToggleButton 
                value="passengers"
                sx={{ 
                  borderRadius: '10px',
                  px: 2.4, 
                  fontSize: '14px', 
                  fontFamily: 'helvetica',
                  textTransform: 'lowercase',
                  letterSpacing: '1px',
                  width: 142
                }}
              >
                passengers
              </ToggleButton>
            </ToggleButtonGroup>

            {/* number of matches */}
            <Typography sx={{ paddingLeft: 1.5, fontFamily: 'Helvetica', fontSize: 13, letterSpacing: '1px', color: '#868686', backgroundColor: '#f8f6ed'}}>
              {potentialDrivers.length + potentialPassengers.length} matches
            </Typography>
            
          </Stack>
        </Stack>
      </div>

// Detach into own component, which also handles the state of which driver is selected 
      {/* matches */}
      <div className='matchescontainer'>
        {potentialPassengers && allUsers.length > 0 ? (
          potentialPassengers.map((potentialPassenger) => (
            <SingleUser key={potentialPassenger.name}
              potentialPassenger={potentialPassenger}
              role={role}
            />
          ))
        ): null}

        {potentialDrivers && allUsers.length > 0 ? (
          potentialDrivers.map((potentialDriver) => (
            <SingleUser key={potentialDriver.name}
              potentialDriver={potentialDriver}
              role={role}
              showingDriver={showingDriver}
              setShowingDriver={setShowingDriver}
            />
          ))
        ): null}
      </div>
    </div>
  )
}

export default Sidebar

