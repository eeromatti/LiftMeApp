import * as React from 'react'
import userService from '../../services/users'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AppContext } from '../../AppContext'
import Logo from '../../photos/logo-green-plus.png'
import { createTheme } from '@mui/material/styles'


export default function SignUp() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2c2b2b',
      },
    },
  })

  //context
  const { setUser } = useContext(AppContext)
  
  // error states
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')


  // other states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  // handle submit
  const handleSubmit = async (event) => {
    setLoading(!loading)
    event.preventDefault()
    if (!email || !password) {
      setEmailError(true)
      setPasswordError(true)
    }
    
    // create an object for the new user
    const login = {
      email: email,
      password: password
    }

    // request user service
    console.log("login:", login)
    const response1 = await userService.loginUser(login)
    
    //update matches 
    const userId = response1.user._id
    // console.log('userId:', userId)
    const res = await userService.updateMatches(userId)
    // console.log('response from updateMatches:', res)
    
    // find user 
    const response2 = await userService.loginUser(login)
    // console.log('response2:', response2)
    
    setUser(response2.user)
    localStorage.setItem('user', JSON.stringify(response2.user))
    localStorage.setItem('token', JSON.stringify(response2.token))
    
    // empty field states
    setEmail('')
    setPassword('')

    //empty error messages
    setEmailError(false)
    setEmailErrorMessage('')
    setPasswordError(false)
    setPasswordErrorMessage('')
    setLoading(!loading)
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
            gap: 2,
            width: '100px',
            maxWidth: '400px',
            minWidth: '300px',
            margin: 'auto',
            padding: '20px',
            justifyContent: 'center',
            height: '85vh'
          }}
        >
          <Typography
            sx={{ fontFamily: 'sans-serif', 
              color: '#2c2b2b', 
              width: '100%', 
              fontSize: 20, 
              fontWeight: 'bold', 
              paddingBottom: 3,
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Sign in
          </Typography>

          {/* name */}
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              fullWidth
              id="email"
              placeholder="john.snow@gmail.com"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>


          {/* password */}
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>

          <Button
            type="submit"
            loading={loading}
            loadingPosition='end'
            variant="outlined"
            sx={{ color: theme.palette.primary.main, maxWidth: '100px' }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>

          <Typography sx={{ color: 'darkgray', fontFamily: 'sans-serif' }}>
            Do not have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
          
      </div>
    </div>
  )
}