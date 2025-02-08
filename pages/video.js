import React, { useRef, useState, useEffect } from 'react'

const VideoPlayer = () => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  var video_list = [
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/what_ive_done.mp4',
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/come_undone.mp4',
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/vertigo.mp4',
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/its_my_life.mp4'
  ]

  var video_name = [
    "What I've Done - Linkin Park",
    'Come Undone - Duran Duran',
    'Vertigo - U2',
    "It's My Life - Talk Talk"
  ]

  const [current_video_name, setcurrent_video_name] = useState(video_name[0])

  const [elm, setelm] = useState(1)

  // Function to toggle mute/unmute
  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  // Function to trigger next video
  const NextVideo = () => {
    const video = videoRef.current
    if (video) {
      console.log(elm)
      setelm(elm + 1)
      if (video_list.length == elm + 1) {
        setelm(0)
      }
      video.src = video_list[elm]
      setcurrent_video_name(video_name[elm])
    }
  }

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
        src="https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/what_ive_done.mp4"
        onEnded={NextVideo}
        className="fixed w-auto min-w-full min-h-full max-w-none filter brightness-50 z-[-1]"
      >
        {/* <source
          // src="https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/what_ive_done.mp4"
          src=""
          ref
          type="video/mp4"
        /> */}
        Your browser does not support the video tag.
      </video>
      <div className="inline-flex justify-between items-center w-full">
        <div className="border-2 border-gray-800 px-5 h-min text-sm text-center hover:text-white hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          Now Playing: {current_video_name} ({isMuted ? 'Muted' : 'Unmuted'})
        </div>
        <div>
          <label class="inline-flex items-center cursor-pointer m-2">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              onClick={toggleMute}
            />
            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black-600 dark:peer-checked:bg-black-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Sound: {isMuted ? 'Off' : 'On'}
            </span>
          </label>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={NextVideo}
          className="inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-900 text-sm px-5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 "
        >
          Next Song
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer
