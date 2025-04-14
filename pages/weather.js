import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
const moment_tz = require('moment-timezone')

const locationMap = {
  geneva: {
    name: 'Meyrin, Geneva, Switzerland',
    lat: 46.23,
    lon: 6.07,
    timezone: 'Europe/Zurich'
  },
  cern: {
    name: '588/R-021 - CERN, Geneva, Switzerland',
    lat: 46.233,
    lon: 6.05,
    timezone: 'Europe/Zurich'
  },
  zurich: {
    name: 'Zurich, Switzerland',
    lat: 47.3769,
    lon: 8.5417,
    timezone: 'Europe/Zurich'
  },
  tokyo: {
    name: 'Tokyo, Japan',
    lat: 35.6895,
    lon: 139.6917,
    timezone: 'Asia/Tokyo'
  },
  nyc: {
    name: 'New York City, USA',
    lat: 40.7128,
    lon: -74.006,
    timezone: 'America/New_York'
  },
  hyd: {
    name: 'Hyderabad, India',
    lat: 17.4065,
    lon: 78.4772,
    timezone: 'Asia/Kolkata'
  },
  ghugus: {
    name: 'Ghugus, India',
    lat: 19.9414,
    lon: 79.1153,
    timezone: 'Asia/Kolkata'
  }
}

const WeatherDataViewer = ({ place = 'geneva' }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const selected = locationMap[place.toLowerCase()]
  const WEATHER_API_URL = selected
    ? `https://www.7timer.info/bin/civil.php?lon=${selected.lon}&lat=${selected.lat}&product=civil&output=json`
    : null

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        return data
      } catch (err) {
        if (attempt === retries) throw err
        await new Promise((res) => setTimeout(res, delay))
      }
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      if (!selected) {
        setError('Invalid location')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const [weather] = await Promise.all([fetchWithRetry(WEATHER_API_URL)])
        setWeatherData(weather)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [place, WEATHER_API_URL, selected])

  // const local_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const utc = new Date().getTime()
  const timeobj = moment_tz.tz(utc, selected.timezone) // creates moment object in specified timezone
  const Converted_DateTimeStr = timeobj.format('h:mm A MMMM Do YYYY')
  const Converted_DateStr = timeobj.format('MMMM Do YYYY')
  const Converted_TimeStr = timeobj.format('h:mm A')

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  // if (loading) return <div className="p-4">Loading my whereabouts...</div>
  if (loading | !weatherData) {
    return (
      <div className="px-4">
        <p className="font-extrabold px-2">{selected.name}</p>
        <div className="flex flex-wrap items-center gap-4 font-extrabold">
          <div className="px-2">{Converted_DateTimeStr}</div>
          {loading ? (
            <div className="px-2 text-blue-400">Loading weather data ...</div>
          ) : (
            <div className="px-2 text-blue-400">No weather data available</div>
          )}
        </div>
      </div>
    )
  }

  const timeString = weatherData.init
  const parsedTime = moment(timeString, 'YYYYMMDDHH')

  const timepointsByIndex = {}

  weatherData.dataseries.forEach((entry, index) => {
    timepointsByIndex[index] = parsedTime.clone().add(entry.timepoint, 'hours')
  })

  const closestIndex = Object.keys(timepointsByIndex).reduce((a, b) =>
    Math.abs(timepointsByIndex[a].diff(timeobj)) <
    Math.abs(timepointsByIndex[b].diff(timeobj))
      ? a
      : b
  )

  return (
    <div className="px-4">
      <p className="font-extrabold px-2">{selected.name}</p>
      <div className="flex flex-wrap items-center gap-4 font-extrabold">
        <div className="text-xl text-bold px-2">{Converted_DateStr}</div>
        <div className="text-xl text-bold px-2">{Converted_TimeStr}</div>
        <div className="text-xl text-bold px-2 text-blue-400">
          {/* {timepointsByIndex[closestIndex].format('YYYYMMDDHH')}{' '} */}
          {weatherData.dataseries[closestIndex].temp2m}°C
        </div>
        <div className="text-xl text-bold px-2 text-blue-400">
          {weatherData.dataseries[closestIndex].weather}
        </div>
      </div>
    </div>
  )
}

export default WeatherDataViewer
