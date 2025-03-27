import * as React from 'react'
import userService from '../../services/users'
import routeService from '../../services/route'
import { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { createTheme } from '@mui/material/styles'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'


export default function SignUpForm() {

  const { user, setUser, token } = useContext(AppContext)
  
  // error states
  const [homeAddressError, setHomeAddressError] = useState(false)
  const [homeAddressErrorMessage, setHomeAddressErrorMessage] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')

  // other states
  const [name, setName] = useState(user.name)
  const [roleList, setRoleList] = useState(user.role)
  const [role, setRole] = useState('')
  const [homeAddress, setHomeAddress] = useState(user.homeAddress)
  // eslint-disable-next-line no-unused-vars
  const [workAddress, setWorkAddress] = useState(user.workAddress)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2c2b2b',
      },
    },
  })

  useEffect(() => {
    if (roleList.length === 2) {
      setRole('both')
    } else {
      setRole(roleList[0])
    }
  }, [])


  const handleRoleChange = (event) => {
    setRole(event.target.value)
    if (event.target.value == 'both') {
      setRoleList(['driver', 'passenger'])
    } else {
      setRoleList([event.target.value])
    }
  }


  const addressValidator = async (address) => {
    try {
      return await routeService.addressToCoordinates(address)
    } catch (error) {
      console.error('addressValidator failed', error)
      return null
    }
  }


  const validateInputs = async () => {
    let isValid = true
    let homeCoordinates = null
    let workCoordinates = null

    // validate name
    if (!name || !name.length > 0) {
      setNameError(true)
      setNameErrorMessage('Name is required.')
      isValid = false
    } else {
      setNameError(false)
      setNameErrorMessage('')
    }

    // validate home address
    if (!homeAddress || homeAddress.length === 0) {
      setHomeAddressError(true)
      setHomeAddressErrorMessage('Please enter a valid address.')
      isValid = false
    } else {
      const homeAddressCoordinates = await addressValidator(homeAddress)
      if (!homeAddressCoordinates) {
        setHomeAddressError(true)
        setHomeAddressErrorMessage('No coordinates available for the given address.')
        isValid = false
      } else {
        homeCoordinates = [
          parseFloat(homeAddressCoordinates[3]), 
          parseFloat(homeAddressCoordinates[0])
        ]
      }
    }

    return { isValid, homeCoordinates, workCoordinates }
  }


  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    const { isValid, homeCoordinates } = await validateInputs()
    if (!isValid) {
      console.log('epävalidi')
      return
    }
    // create an object for the new user
    let newUser = null
    if (homeCoordinates.length > 0) {
      newUser = {
        id: user._id,
        name: name,
        role: roleList,
        homeAddress: homeAddress,
        homeCoordinates: homeCoordinates,
      }
    }
    
    // request user services
    await userService.updateUser(newUser, token)
    await userService.updateMatches(user._id, token)
    const res = await userService.getUserById(user._id, token)
    setUser(res.data)
    navigate('/')
    
    
    //empty error messages
    setNameError(false)
    setNameErrorMessage('')
    setHomeAddressError(false)
    setHomeAddressErrorMessage('')
    setPasswordErrorMessage('')
    setLoading(false)
  }

  const handleCancel = (event) => {
    event.preventDefault()
    window.location.href = '/'
  }

  return (
    <div className='login'>
      <div className='login-logo-side'>
        <div>
          <img src='/logo-green-plus.png' width='300px'/>
        </div>
      </div>
      <div className='login-form-side'>
          
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex', 
            color: 'primary', 
            fontFamily:'sans-serif', 
            flexDirection: 'column', 
            gap: 1.5,
            width: '100px',
            maxWidth: '400px',
            minWidth: '300px',
            margin: 'auto',
            padding: '20px',
            justifyContent: 'center',

          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontFamily: 'Helvetica', 
              color: '#2c2b2b', 
              fontSize: '20px', 
              fontWeight: 'normal',
              letterSpacing: '2px',
              width: '100%',  
              paddingBottom: 3,
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Profile
          </Typography>

          {/* name */}
          <FormControl>
            <FormLabel htmlFor="name" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: 'darkslategray' }}>
              Name / Slack handle
            </FormLabel>
            <TextField
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Jon Snow"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? 'error' : 'primary'}
              sx={{
                input: {
                  fontFamily: 'Helvetica',
                  fontSize: '14px',
                  letterSpacing: '1px'
                }
              }}
            />
          </FormControl>

          {/* role */}
          <FormControl>
            <FormLabel htmlFor="role" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: 'darkslategray' }}>
              Role
            </FormLabel>
            <Select
              value={role}
              onChange={handleRoleChange}
              fullWidth
              variant="outlined"
              id="role"
              name="role"
              sx={{
                fontFamily: 'Helvetica',
                fontSize: '14px',
                letterSpacing: '1px',
                color: '#2c2b2b'
              }}
            >
              <MenuItem value="passenger" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}>
                Passenger
              </MenuItem>
              <MenuItem value="driver" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}>
                Driver
              </MenuItem>
              <MenuItem value="both" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}>
                Both
              </MenuItem>
            </Select>
          </FormControl>

          {/* Home address / starting point */}
          <FormControl>
            <FormLabel htmlFor="home" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: 'darkslategray' }}>
              Home address / Starting location
            </FormLabel>
            <TextField
              required
              fullWidth
              onChange={(e) => setHomeAddress(e.target.value)}
              value={homeAddress}
              id="home"
              placeholder="Westeros street 3, Winterfell"
              name="home"
              autoComplete="home"
              variant="outlined"
              error={homeAddressError}
              helperText={homeAddressErrorMessage}
              color={homeAddressError ? 'error' : 'primary'}
              sx={{
                input: {
                  fontFamily: 'Helvetica',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  color: '#2c2b2b'
                }
              }}
            />
          </FormControl>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              gap: 1.5,
            }}
          >
            <Button
              type="submit"
              loading={loading}
              loadingPosition='end'
              variant="outlined"
              sx={{ color: theme.palette.primary.main, maxWidth: '100px' }}
              style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}
              onClick={handleSubmit}
            >
              Update
            </Button>

            <Button
              type="cancel"
              variant="outlined"
              sx={{ color: theme.palette.primary.main, maxWidth: '100px' }}
              style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  )
}