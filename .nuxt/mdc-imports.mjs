import _RemarkEmoji from 'remark-emoji'
import _RemarkGfm from 'remark-gfm'
import _Highlight from '/Users/pfinal/Documents/pfinal-ai-propmt-nav/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.js'

export const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
  'remark-gfm': { instance: _RemarkGfm },
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":"github-light"}