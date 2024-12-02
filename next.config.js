const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const withNextra = require('nextra')({
    theme:'nextra-theme-blog',
    themeConfig:'./theme.config.js',
    mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
})
module.exports = withNextra()