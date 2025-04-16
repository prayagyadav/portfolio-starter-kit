import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import '../styles/main.css'
import Script from 'next/script'
import VideoPlayer from './video'
import LiveStream from './live'
import { Analytics } from '@vercel/analytics/react'

import { useState } from 'react'

// export default function Nextra({ Component, pageProps }) {
//   return (
//     <>
//       <Head>
//         <link
//           rel="alternate"
//           type="application/rss+xml"
//           title="RSS"
//           href="/feed.xml"
//         />
//         <link
//           rel="preload"
//           href="/fonts/Inter-roman.latin.var.woff2"
//           as="font"
//           type="font/woff2"
//           crossOrigin="anonymous"
//         />
//       </Head>
//       <Component {...pageProps} />
//     </>
//   )
// }

export default function Nextra({ Component, pageProps }) {
  const [isVisible, setisVisible] = useState(true)

  // Function to toggle text visibility
  const toggleVisibility = () => {
    setisVisible(!isVisible)
  }

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Analytics />
      {/* <VideoPlayer
        isVisible={isVisible}
        onClickVisibilty={toggleVisibility}
        className="z-[-1]"
      ></VideoPlayer> */}
      {/* <LiveStream className="z-[-1]"></LiveStream> */}
      {isVisible ? (
        <Component {...pageProps} />
      ) : (
        <Head>
          <title>Fullscreen Mode</title>
        </Head>
      )}
    </>
  )
}
