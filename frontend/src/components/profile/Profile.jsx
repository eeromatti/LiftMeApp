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
import Logo from '../../photos/logo-green-plus.png'
import { createTheme } from '@mui/material/styles'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'


export default function SignUpForm() {

  const { user, setUser } = useContext(AppContext)
  
  // error states
  const [homeAddressError, setHomeAddressError] = useState(false)
  const [homeAddressErrorMessage, setHomeAddressErrorMessage] = useState('')
  const [workAddressError, setWorkAddressError] = useState(false)
  const [workAddressErrorMessage, setWorkAddressErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  // other states
  const [name, setName] = useState(user.name)
  const [roleList, setRoleList] = useState(user.role)
  const [role, setRole] = useState('')
  const [homeAddress, setHomeAddress] = useState(user.homeAddress)
  const [workAddress, setWorkAddress] = useState(user.workAddress)
  const [email, setEmail] = useState(user.email)
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
      // console.log('name ok')
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
    
    // validate work address
    if (!workAddress || workAddress.length === 0) {
      setWorkAddressError(true)
      setWorkAddressErrorMessage('Please enter a valid address.')
      isValid = false
    } else {
      const workAddressCoordinates = await addressValidator(workAddress)
      if (!workAddressCoordinates) {
        setWorkAddressError(true)
        setWorkAddressErrorMessage('No coordinates available for the given address.')
        isValid = false
      } else {
        workCoordinates = [
          parseFloat(workAddressCoordinates[3]), 
          parseFloat(workAddressCoordinates[0])
        ]
      }
    }

    // email
    if (!email) {
      setEmailError(true)
      setEmailErrorMessage('Email is incorrect')
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage('')
    }

    return { isValid, homeCoordinates, workCoordinates }
  }


  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    const { isValid, homeCoordinates, workCoordinates } = await validateInputs()
    if (!isValid) {
      console.log('epävalidi')
      return
    }
    // create an object for the new user
    let newUser = null
    if (homeCoordinates.length > 0 && workCoordinates.length > 0) {
      newUser = {
        id: user._id,
        name: name,
        email: email,
        role: roleList,
        homeAddress: homeAddress,
        homeCoordinates: homeCoordinates,
        workAddress: workAddress,
        workCoordinates: workCoordinates,
      }
    }

    if (newUser) {
      console.log('newUser:', newUser)
    } else {
      console.log('newUser not available')
    }
    
    // request user services
    await userService.updateUser(newUser)
    await userService.updateMatches(user._id)
    const res = await userService.getUserById(user._id)
    console.log('user from db after the update:', res.data)
    setUser(res.data)
    // localStorage.setItem('user', JSON.parse(res.data))
    navigate('/')
    
    
    //empty error messages
    setNameError(false)
    setNameErrorMessage('')
    setHomeAddressError(false)
    setHomeAddressErrorMessage('')
    setWorkAddressError(false)
    setWorkAddressErrorMessage('')
    setPasswordError(false)
    setPasswordErrorMessage('')

    setLoading(false)
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className='login'>
      <div className='login-logo-side'>
        <div>
          <img src={Logo} width='300px'/>
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
            />
          </FormControl>


          {/* email */}
          <FormControl>
            <FormLabel htmlFor="email" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: 'darkslategray' }}>
              Email
            </FormLabel>
            <TextField
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              fullWidth
              id="email"
              placeholder="john.snow@westerosnet.com"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
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
            >
              <MenuItem value="passenger">Passenger</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="both">Both</MenuItem>
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
            />
          </FormControl>

          {/* Work address / ending point */}
          <FormControl>
            <FormLabel htmlFor="work" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: 'darkslategray' }}>
              Work address / Ending location
            </FormLabel>
            <TextField
              required
              fullWidth
              onChange={(e) => setWorkAddress(e.target.value)}
              value={workAddress}
              id="work"
              placeholder="King's street 5, Winterfell"
              name="work"
              autoComplete="work"
              variant="outlined"
              error={workAddressError}
              helperText={workAddressErrorMessage}
              color={passwordError ? 'error' : 'primary'}
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