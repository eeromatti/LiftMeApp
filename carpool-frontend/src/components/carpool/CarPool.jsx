 

import React from 'react'
import Sidebar from './Sidebar'
import MapLibre from './MapLibre'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useContext } from 'react'
import { AppContext } from '../../AppContext'

const CarPool = () => {
  const { loading } = useContext(AppContext)

  return (
    <div>
      { loading == false ? (
        <div className='carpool'>
          <Sidebar />
          <MapLibre />
        </div>
      ):
      null
      }
    </div>
  )
}

export default CarPool