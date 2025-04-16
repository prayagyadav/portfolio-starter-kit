import React, { useRef, useState, useEffect } from 'react'

const LiveStream = ({ isVisible, onClickVisibilty }) => {
  const youtube_stream_link =
    'https://www.youtube.com/embed/H999s0P1Er0?si=uGwD0TprAUcniK1W&amp;controls=0'
  // 'https://www.youtube.com/embed/cH7VBI4QQzA?si=-DVIR8dtuXT2JNYi&amp;controls=0'
  const stream_name = 'Live from International Space Station'
  return (
    <div>
      {/* <video
        ref={videoRef}
        autoPlay
        src="https://www.youtube.com/embed/H999s0P1Er0?si=uGwD0TprAUcniK1W&amp;controls=0"
        onEnded={NextVideo}
        className="fixed w-full max-h-full filter brightness-[0.25] z-[-1] "
      >
        Your browser does not support the video tag.
      </video> */}
      <iframe
        src={youtube_stream_link.concat('&autoplay=1')}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        title="YouTube video player"
        frameborder="0"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        className="fixed w-full max-h-full filter brightness-[0.25] z-[-1] "
      ></iframe>

      {/* <div className="inline-flex justify-between items-center w-full">
        <div className="border-2 border-gray-800 px-5 h-min text-sm text-center hover:text-white hover:bg-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          Now Playing: {stream_name}
        </div>
      </div>*/}
    </div>
  )
}

export default LiveStream
