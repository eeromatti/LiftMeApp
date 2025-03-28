/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect, useMemo } from 'react'
import routeService from './services/route'
import userService from './services/users'

export const AppContext = createContext()

export const AppProvider = ( { children }) => {

  const [user, setUser] = useState({})
  const [pickupCoordinates, setPickupCoordinates] = useState([])
  const [passengers, setPassengers] = useState([])
  const [drivers, setDrivers] = useState([])
  const [distance, setDistance] = useState(null)
  const [travelTime, setTravelTime] = useState(null)
  const [route, setRoute] = useState([])
  const [potentialPassengers, setPotentialPassengers] = useState([])
  const [potentialDrivers, setPotentialDrivers] = useState([])
  const [startCoordinates, setStartCoordinates] = useState([])
  const [endCoordinates, setEndCoordinates] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [activeDays, setActiveDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [token, setToken] = useState(null)
  const [orsKey, setOrsKey] = useState('')

  //initialization / load user from the local storage, set start and end coordinates and load all users
  useEffect(() => {
    const initialize = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'))  
      const tokenFromLocalStorage = JSON.parse(localStorage.getItem('token'))
      const orsKeyFromLocalStorage = JSON.parse(localStorage.getItem('orskey'))
  
      if (storedUser) {
        setToken(tokenFromLocalStorage)
        setOrsKey(orsKeyFromLocalStorage)
        setUser(storedUser)
        setStartCoordinates(storedUser.homeCoordinates)
        setEndCoordinates(storedUser.workCoordinates)
        setPotentialDrivers(storedUser.drivers)
        setPotentialPassengers(storedUser.passengers)
        setActiveDays(storedUser.activeDays)
  
        try {
          const response = await userService.getUsers(tokenFromLocalStorage)
          setAllUsers(response)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
    }
  
    initialize()
  }, [token])


  //find an optimized route, distance and travel time
  useEffect(() => {
    const findDistanceAndTravelTime = async () => {
      // console.log("kontekstin effect hook reagoi pickupCoordinates-tilan muutokseen")
      try {
        if (startCoordinates.length === 2 && endCoordinates.length === 2 && orsKey) {
          const optimizedData = await routeService.travelTimeAndDistance(startCoordinates, endCoordinates, pickupCoordinates, orsKey)
          // console.log("optimoitu reitti haettu")
          // pickup points exist 
          if (optimizedData && optimizedData.length === 3) {
            // console.log('optimizedData for ABC:', optimizedData)
            setRoute(optimizedData[0])
            setDistance(Math.round(optimizedData[1]/1000))
            setTravelTime(Math.round(optimizedData[2]/60))
          } else {
            // console.log('optimizedData for AB:', optimizedData)
            setRoute([startCoordinates, endCoordinates])
            setDistance(Math.round(optimizedData[0]/1000))
            setTravelTime(Math.round(optimizedData[1]/60))
          }
        }     
      } catch (error) {
        console.error('error in calculating the route', error)
      }}
    findDistanceAndTravelTime()

  }, [startCoordinates, endCoordinates, pickupCoordinates])


  useEffect(() => {
    if (
      potentialDrivers !== undefined &&
      potentialPassengers !== undefined &&
      potentialDrivers.length >= 0 && 
      potentialPassengers.length >= 0 &&
      user && 
      Object.keys(user).length > 0 && 
      user.name && 
      user.homeAddress && 
      user.workAddress && 
      user.homeCoordinates && 
      user.workCoordinates
    ) {
      // console.log("loadingin ehdot täyttyvät:", loading)
      setLoading(false)
    }
  }, [user, potentialDrivers, potentialPassengers]) 



  return (
    <AppContext.Provider
      value={{
        user, setUser,
        allUsers, setAllUsers,
        route, setRoute,
        distance, setDistance,
        travelTime, setTravelTime,
        passengers, setPassengers,
        drivers, setDrivers,
        potentialPassengers, setPotentialPassengers,
        potentialDrivers, setPotentialDrivers,
        pickupCoordinates, setPickupCoordinates,
        startCoordinates, setStartCoordinates,
        endCoordinates, setEndCoordinates,
        activeDays, setActiveDays,
        loading, setLoading,
        mapLoaded, setMapLoaded,
        token, setToken
      }}
    >
      {children}
    </AppContext.Provider>
  )
}




