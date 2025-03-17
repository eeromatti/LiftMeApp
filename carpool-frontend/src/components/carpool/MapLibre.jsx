import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from '../../AppContext'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const MapLibre = () => {
  const { route, user, mapLoaded, setMapLoaded } = useContext(AppContext)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (!user || !user.homeCoordinates) return

    const mapTemp = new maplibregl.Map({
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [user.homeCoordinates[0], user.homeCoordinates[1]],
      zoom: 8.5,
      container: 'map'
    })

    mapTemp.on('load', () => {
      setMap(mapTemp)
    })

    return () => mapTemp.remove() 
  }, [user])



  useEffect(() => {
    if (!map || !route || !Array.isArray(route) || !map.isStyleLoaded()) return
    if (route.length < 2) return
  

    const coordinates = route.map(coord => coord.join(',')).join(';')
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=true`
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.routes.length) return
  
        const routeGeometry = data.routes[0].geometry
  
        if (map.getSource('route')) {
          map.getSource('route').setData({
            type: 'Feature',
            geometry: routeGeometry
          })
        } else {
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: routeGeometry
            }
          })
  
          map.addLayer({
            id: 'route-outline',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#FFFFFF', 
              'line-width': 5 // Paksumpi kuin varsinainen viiva
            }
          })
          
          // Pääviiva vihreänä
          map.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#00bf63', // Varsinainen viiva vihreänä
              'line-width': 3 // Pienempi kuin ääriviiva
            }
          })
        }
      })
  
    // Luo yksi yhteinen GeoJSON-lähde kaikille pysäkeille
    const stopsGeoJSON = {
      type: 'FeatureCollection',
      features: route.map((stop) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: stop }
      }))
    }
  
    if (map.getSource('stops')) {
      map.getSource('stops').setData(stopsGeoJSON)
    } else {
      map.addSource('stops', { type: 'geojson', data: stopsGeoJSON })
  
      map.addLayer({
        id: 'stops-layer',
        type: 'circle',
        source: 'stops',
        paint: {
          'circle-radius': 6,
          'circle-color': '#ff8c1a'
        }
      })
    }

      // Ensure stops-layer is above the route layers
  if (map && map.getLayer('stops-layer')) {
    map.moveLayer('stops-layer')
  }
  }, [map, route])
  

  

  return (
    <div id="map" className='map'></div>
  )
}

export default MapLibre
