import React, { useEffect, useState } from 'react'

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
  }
}

const WeatherDataViewer = ({ place = 'geneva' }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [timeData, setTimeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const selected = locationMap[place.toLowerCase()]
  const WEATHER_API_URL = selected
    ? `https://www.7timer.info/bin/astro.php?lon=${selected.lon}&lat=${selected.lat}&product=astro&output=json`
    : null
  const TIME_API_URL = selected
    ? `https://worldtimeapi.org/api/timezone/${selected.timezone}`
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
        const [weather, time] = await Promise.all([
          fetchWithRetry(WEATHER_API_URL),
          fetchWithRetry(TIME_API_URL)
        ])
        setWeatherData(weather.dataseries[0])
        setTimeData(time)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [place, WEATHER_API_URL, TIME_API_URL, selected])

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (loading) return <div className="p-4">Loading my whereabouts...</div>
  if (!weatherData || !timeData)
    return <div className="p-4">No data available</div>

  const date = new Date(timeData.datetime)
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: selected.timezone
  })
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: selected.timezone
  })

  return (
    <div className="px-4">
      {/* <p>Current residing at</p> */}
      <p className="font-extrabold px-2">{selected.name}</p>
      <div className="flex flex-wrap items-center gap-4 font-extrabold">
        <div className="px-2">{dateStr}</div>
        <div className="px-2">{timeStr}</div>
        <div className="px-2 text-blue-600">{weatherData.temp2m}°C</div>
      </div>
    </div>
  )
}

export default WeatherDataViewer
