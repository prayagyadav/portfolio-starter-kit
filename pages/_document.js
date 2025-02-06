import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: 'Prayag Yadav',
    description: 'Personal portfolio of Prayag Yadav',
    image:
      'https://images.prismic.io/blog-prayagyadav/ZgnSvst2UUcvBTBK_IMG_20220423_202639.jpg?auto=format%2Ccompress&rect=0%2C321%2C3145%2C3145&w=1920&fit=max'
  }

  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
          integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
          crossOrigin="anonymous"
        />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_PrayagYadav" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body className="bg-[url(/images/snowfall.gif)]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
