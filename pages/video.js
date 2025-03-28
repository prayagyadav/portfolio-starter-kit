import React, { useRef, useState, useEffect } from 'react'

const VideoPlayer = ({ isVisible, onClickVisibilty }) => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  var video_list = [
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/what_ive_done.mp4',
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/come_undone.mp4',
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/vertigo.mp4',
    'https://cdn.prayagyadav.com/abash4py7KxmbpeTYOqgwuazw64933x4iAyWRNzrNswlxlY1zt6I7xdaO/share/its_my_life.mp4',
    'https://upload.wikimedia.org/wikipedia/commons/9/91/%28G%29I-DLE_-_Uh_Oh.webm',
    'https://upload.wikimedia.org/wikipedia/commons/b/b8/Robin_Schulz_-_%22Sugar%22_-_Director%27s_Cut.webm',
    'https://upload.wikimedia.org/wikipedia/commons/6/68/JINJER_-_Sit_Stay_Roll_Over_%28Official_Music_Video%29.webm',
    'https://upload.wikimedia.org/wikipedia/commons/2/2e/Robin_Schulz_-_%22Show_Me_Love%22_--_Official_Music_Video.webm',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Depeche_Mode_-_Everything_Counts_%28Live_-_from_101%29_%28Official_Video%29.webm',
    'https://upload.wikimedia.org/wikipedia/commons/5/52/Depeche_Mode_-_It%27s_Called_A_Heart_%28Official_Video%29.webm',
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Le_Sserafim_-_Fearless_MV_%28DOP%29.webm',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/%E3%81%BE%E3%81%A0%E5%83%95%E3%82%89%E3%82%92%E7%9F%A5%E3%82%89%E3%81%AA%E3%81%84%E5%90%9B%E3%81%B8_Music_Video.webm',
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/%28SPECIAL_VIDEO%29_SEVENTEEN%28%EC%84%B8%EB%B8%90%ED%8B%B4%29_-_Anyone.webm',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Ave_Maria_-_Schubert_~_Violin.webm'
  ]

  var video_name = [
    "What I've Done - Linkin Park",
    'Come Undone - Duran Duran',
    'Vertigo - U2',
    "It's My Life - Talk Talk",
    'Uh-Oh - (G)I-DLE',
    'Sugar - Robin Schultz',
    'Sit Stay Roll Over - JINJER',
    'Show me love - Robin Shultz',
    'Everything Counts (Live) - Depeche Mode',
    "It's called a heart - Depeche Mode",
    'Fearless - Le Sserafim',
    'まだ僕らを知らない君へ',
    'Anyone - SEVENTEEN(세븐틴)',
    'Ave Maria - Schubert played by Katy Adelson'
  ]

  const [current_video_name, setcurrent_video_name] = useState(video_name[0])
  const [elm, setelm] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)

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

  // Function to trigger play/pause
  const PlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
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
        className="fixed w-full max-h-full filter brightness-[0.25] z-[-1] "
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
          <label className="inline-flex items-center cursor-pointer m-2">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={toggleMute}
            />
            {/* <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black-600 dark:peer-checked:bg-black-600"></div> */}
            <div className="relative w-5 h-5 border-2 border-gray-600 peer after:w-5 after:h-5 peer-checked:bg-gray-600 peer-hover:bg-gray-600 peer-hover:border-gray-400 "></div>
            <span className="ms-3 w-20 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Sound: {isMuted ? 'Off' : 'On'}
            </span>
          </label>
        </div>
      </div>
      <div className="inline-flex justify-between items-center w-full">
        <button
          type="button"
          onClick={NextVideo}
          className="inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-900 text-sm px-5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600  "
        >
          Next Song
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
        <div>
          <label className="inline-flex items-center cursor-pointer m-2">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={onClickVisibilty}
            />
            <div className="relative w-5 h-5 border-2 border-gray-600 bg-gray-600 peer after:w-5 after:h-5 after:bg-gray-600 peer-checked:bg-transparent peer-hover:bg-transparent peer-hover:border-gray-400"></div>
            <span className="ms-3 w-20 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Text: {isVisible ? 'On' : 'Off'}
            </span>
          </label>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={PlayPause}
          className="inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-900 text-sm px-5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 "
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer
