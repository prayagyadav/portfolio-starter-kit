import React, { useEffect, useState } from 'react'

const WhereaboutsViewer = ({ place = 'geneva' }) => {
  const [whereabouts, setWhereabouts] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWhereabouts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/whereabouts?place=${place}`)
        if (!res.ok) throw new Error('Failed to fetch whereabouts')
        const data = await res.json()
        setWhereabouts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWhereabouts()
  }, [place])

  if (loading) return <div className="p-4">Loading whereabouts...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

  return (
    <div className="px-4">
      <p className="font-extrabold px-2">{whereabouts.name}</p>
      <div className="flex flex-wrap items-center gap-4 font-extrabold">
        <div className="text-xl px-2">{whereabouts.date}</div>
        <div className="text-xl px-2">{whereabouts.time}</div>
        <div className="text-xl text-blue-400 px-2">
          {whereabouts.temperature}°C
        </div>
        <div className="text-xl text-blue-400 px-2">
          {whereabouts.description}
        </div>
      </div>
    </div>
  )
}

export default WhereaboutsViewer
