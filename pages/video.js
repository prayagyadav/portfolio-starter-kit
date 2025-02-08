import React, { useRef, useState, useEffect } from 'react'

const VideoPlayer = () => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  // Function to toggle mute/unmute
  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  useEffect(() => {
    // Ensure that the video is muted when the component mounts
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [])

  useEffect(() => {
    // Update the video element's mute state if the `isMuted` state changes
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        loop
        className="fixed w-auto min-w-full min-h-full max-w-none filter brightness-50 z-[-1]"
      >
        <source
          src="https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/what_ive_done.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-between w-full">
        <p>
          Now Playing: What I've Done - Linkin Park ({' '}
          {isMuted ? 'Muted' : 'Unmuted'}){' '}
        </p>
        {/* <button type="button" onClick={toggleMute} className=''>
          {isMuted ? 'Unmute' : 'Mute'}
        </button> */}
        <label class="inline-flex items-center cursor-pointer m-2">
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            onClick={toggleMute}
          />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black-300 dark:peer-focus:ring-black-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black-600 dark:peer-checked:bg-black-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 w-12">
            {isMuted ? 'Unmute' : 'Mute'}
          </span>
        </label>
      </div>
    </div>
  )
}

export default VideoPlayer
