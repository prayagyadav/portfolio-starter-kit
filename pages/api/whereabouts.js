import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
const moment_tz = require('moment-timezone')

import cors, { runMiddleware } from '../../lib/cors'

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
  },
  lincoln: {
    name: 'Lincoln, NE, USA',
    lat: 40.819,
    lon: -96.7,
    timezone: 'America/Chicago'
  }

}

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

export default async function handler(req, res) {
  const place = req.query.place || 'geneva'
  const selected = locationMap[place.toLowerCase()]

  if (!selected) {
    return res.status(400).json({ error: 'Invalid location' })
  }

  const WEATHER_API_URL = `https://www.7timer.info/bin/civil.php?lon=${selected.lon}&lat=${selected.lat}&product=civil&output=json`

  try {
    await runMiddleware(req, res, cors) // Apply CORS

    const weatherData = await fetchWithRetry(WEATHER_API_URL)

    const utc = new Date().getTime()
    const timeobj = moment_tz.tz(utc, selected.timezone)
    const Converted_DateStr = timeobj.format('MMMM Do YYYY')
    const Converted_TimeStr = timeobj.format('h:mm A')

    const timeString = weatherData.init
    const parsedTime = moment(timeString, 'YYYYMMDDHH')

    const timepointsByIndex = {}

    weatherData.dataseries.forEach((entry, index) => {
      timepointsByIndex[index] = parsedTime
        .clone()
        .add(entry.timepoint, 'hours')
    })

    const closestIndex = Object.keys(timepointsByIndex).reduce((a, b) =>
      Math.abs(timepointsByIndex[a].diff(timeobj)) <
      Math.abs(timepointsByIndex[b].diff(timeobj))
        ? a
        : b
    )

    res.status(200).json({
      name: selected.name,
      date: Converted_DateStr,
      time: Converted_TimeStr,
      temperature: weatherData.dataseries[closestIndex].temp2m,
      description: weatherData.dataseries[closestIndex].weather
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
