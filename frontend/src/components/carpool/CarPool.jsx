import React from 'react'
import Sidebar from './Sidebar'
import MapLibre from './MapLibre'

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