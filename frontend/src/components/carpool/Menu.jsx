import * as React from 'react'
import { useContext } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()

  const { token, setToken, user, setUser, setLoading, setPotentialDrivers, setPotentialPassengers, setRoute } = useContext(AppContext)

  const open = Boolean(anchorEl)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  const handleLogout = () => {
    setAnchorEl(null)
    localStorage.clear('user')
    localStorage.clear('token')
    setLoading(true)
    setToken(null)
    setUser({})
  }

  return (
    <React.Fragment>
      <Box sx={{ top: 15, right: 10 }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon sx={{ width: 40, height: 40 }}></MenuIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile} style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '16px', letterSpacing: '1px', color: '#2c2b2b' }}>
          <Avatar src={user.photo} /> My profile
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleLogout} style={{fontFamily: 'Helvetica', fontWeight: 'light', fontSize: '16px', letterSpacing: '1px', color: '#2c2b2b' }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
