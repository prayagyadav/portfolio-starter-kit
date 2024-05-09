import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import '../styles/main.css'
import Script from 'next/script'


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
           
           <Component {...pageProps} />
           
         </>
  )
}

