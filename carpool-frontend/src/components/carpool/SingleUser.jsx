/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AppContext } from '../../AppContext'

import { Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'


const SingleUser = ( { potentialPassenger, potentialDriver, role } ) => {


  const { 
    pickupCoordinates, 
    setPickupCoordinates,
    setStartCoordinates,
    allUsers,
    user,
    activeDays
  
  } = useContext(AppContext)

  const [showMore, setShowMore] = useState(false)

  let passengerUserInfo = potentialPassenger ? allUsers.find(user => potentialPassenger.name === user.name) : null
  let driverUserInfo = potentialDriver ? allUsers.find(user => potentialDriver.name === user.name) : null
  

  useEffect(() => {
    if (role === 'driver') {
      // eslint-disable-next-line no-unused-vars
      let passengerUserInfo = null
      setShowMore(false)
    } else {
      // eslint-disable-next-line no-unused-vars
      let driverUserInfo = null
      setShowMore(false)
    }
  }, [role])

  
  const handlePassengerAddition = () => {
    if (!showMore && passengerUserInfo) {
      setShowMore(true)
      setPickupCoordinates([...pickupCoordinates, passengerUserInfo.homeCoordinates])
    } else {
      setShowMore(false)
      setPickupCoordinates(pickupCoordinates.filter(coord => coord !== passengerUserInfo.homeCoordinates))
    }
  }

  const handleDriverAddition = () => {
    if (!showMore && driverUserInfo) {
      setShowMore(true)
      setStartCoordinates(driverUserInfo.homeCoordinates)
      setPickupCoordinates([...pickupCoordinates, user.homeCoordinates])
    } else {
      setShowMore(false)
      setStartCoordinates(user.homeCoordinates)
      setPickupCoordinates(pickupCoordinates.filter(coord => coord !== driverUserInfo.homeCoordinates))
    }
  }



  return (
    // potential passenger 
    <div>
      {role === 'passengers' ? 
        (passengerUserInfo && activeDays.some(day => passengerUserInfo.activeDays.includes(day)) ?
          <Button
            onClick = {handlePassengerAddition}
            style = {{ width: '100%' }}
          >
            <div className='matchbox'>
              {showMore ? (
                <div>
                  
                  {/* avatar and name if selected */}
                  <div className='name-selected'>
                    <Stack paddingTop={0.5}>
                      <Avatar src={passengerUserInfo.photo} />
                    </Stack>
                    <Typography paddingLeft={2} paddingTop={1.65} fontWeight='bold' variant="body1" gutterBottom>{passengerUserInfo.name}</Typography>
                  </div>


                  {/* other info (if selected) */}
                  <div className='other-info'>
                    <Typography variant="body2" color="textSecondary">
                      {passengerUserInfo.activeDays.join(' • ')}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Pickup:</strong> {passengerUserInfo.flexiblePickup ? 'Flexible' : 'Home'}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Extra distance and time if home pickup:</strong>
                      <br />
                      🚗 ~ {(potentialPassenger.deltaDistance / 1000).toFixed(1)} km  
                      ⏳ ~ {(potentialPassenger.deltaTime / 60).toFixed()} min
                    </Typography>
                  </div>
                </div>
              ) : (

                
                // avatar and name if not selected
                <div className='name-not-selected'>
                  <Stack direction="row" spacing={2} alignItems='center'>
                    <Avatar src={passengerUserInfo.photo} />
                    <Typography variant="body1" gutterBottom>{passengerUserInfo.name}</Typography>
                  </Stack>
                </div>
              )}
            </div>
          </Button> 
          :
          null
        ) :



        // potential driver
        (driverUserInfo ? 
          <Button
            onClick = {handleDriverAddition}
            style={{ width: '100%' }}
          >
            <div className='matchbox'>
              {showMore ? (
                <div>
                  {/* avatar and name if selected */}
                  <div className='name-selected'>
                    <Stack paddingTop={0.5}>
                      <Avatar src={driverUserInfo.photo} />
                    </Stack>
                    <Typography paddingLeft={2} paddingTop={1.65} variant="body1" gutterBottom>{driverUserInfo.name}</Typography>
                  </div>


                  {/* other info (if selected) */}
                  <div className='other-info'>
                    <Typography variant="body2" color="textSecondary">
                      {driverUserInfo.activeDays.join(' • ')}
                    </Typography>

                    <Typography variant="body2">
                      <strong>Seats available:</strong> 2
                    </Typography>

                    <Typography variant="body2">
                      <strong>Extra distance and time if home pickup:</strong>
                      <br />
                      🚗 ~ {(potentialDriver.deltaDistance / 1000).toFixed(1)} km  
                      ⏳ ~ {(potentialDriver.deltaTime / 60).toFixed()} min
                    </Typography>
                  </div>
                </div>

              ) : (
                  
                <div className='name-not-selected'>
                  <Stack direction="row" spacing={2} alignItems='center'>
                    <Avatar src={driverUserInfo.photo} />
                    <Typography variant="body1" gutterBottom>{driverUserInfo.name}</Typography>
                  </Stack>
                </div>
              )}
              
            </div>
          </Button>
          :
          null
        )}
    </div>
  )}
    

export default SingleUser