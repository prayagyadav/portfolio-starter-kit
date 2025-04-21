const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> © Prayag Yadav
      {/* <a href="/feed.xml">RSS</a> */}
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  ),
  navs: [
    {
      url: 'https://pro.prayagyadav.com',
      name: 'Pro Mode ↗️'
    },
    {
      url: 'https://blog.prayagyadav.com',
      name: 'Blog ↗️'
    }
  ]
}
