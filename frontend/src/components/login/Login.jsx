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
  const { setToken } = useContext(AppContext)
  
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
    const response1 = await userService.loginUser(login)

    //update matches 
    const userId = response1.user._id
    const token = response1.token
    await userService.updateMatches(userId, token)
    
    // find user 
    const response2 = await userService.loginUser(login)
    localStorage.setItem('user', JSON.stringify(response2.user))
    localStorage.setItem('token', JSON.stringify(response2.token))    
    localStorage.setItem('orskey', JSON.stringify(response2.orskey))
    setToken(response2.token)
    
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
            sx={{ fontFamily: 'Helvetica', 
              fontWeight: 'normal',
              fontSize: '20px', 
              letterSpacing: '2px',
              color: '#2c2b2b', 
              width: '100%', 
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
            <FormLabel htmlFor="email" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}>
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
              placeholder="john.snow@gmail.com"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
              sx={{
                input: {
                  fontFamily: 'Helvetica',
                  fontSize: '14px',
                  letterSpacing: '1px'
                }
              }}
            />
          </FormControl>


          {/* password */}
          <FormControl>
            <FormLabel htmlFor="password" style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}>
              Password
            </FormLabel>
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
              sx={{
                input: {
                  fontFamily: 'Helvetica',
                  fontSize: '14px',
                  letterSpacing: '1px'
                }
              }}
            />
          </FormControl>

          <Button
            type="submit"
            loading={loading}
            loadingPosition='end'
            variant="outlined"
            sx={{ color: theme.palette.primary.main, maxWidth: '120px' }}
            onClick={handleSubmit}
            style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1px', color: '#2c2b2b' }}
          >
            Sign in
          </Button>

          <Typography style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '14px', letterSpacing: '1.2px', color: '#2c2b2b' }}>
            Do not have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
          
      </div>
    </div>
  )
}