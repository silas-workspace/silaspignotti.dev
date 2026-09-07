import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import icon from 'astro-icon'

import expressiveCode from 'astro-expressive-code'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkSectionize from 'remark-sectionize'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: 'static',
  site: 'https://silaspignotti.dev',
  redirects: {
    '/projects/dispoai': '/projects/routing-engine',
  },

  integrations: [expressiveCode({
    themes: ['catppuccin-latte', 'ayu-dark'],
    plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
    useDarkModeMediaQuery: true,
    defaultProps: {
      wrap: true,
      collapseStyle: 'collapsible-auto',
      overridesByLang: {
        'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
          {
            showLineNumbers: true,
          },
      },
    },
  }), mdx(), react(), icon()],

  vite: {
    plugins: [tailwindcss() as any],
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "clsx",
        "framer-motion",
        "lucide-react",
        "lodash.debounce",
        "@radix-ui/react-icons",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot"
      ]
    },    
  },

  devToolbar: {
    enabled: false,
  },

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          ariaLabel: 'External link'
        },
      ],
      rehypeHeadingIds,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'catppuccin-latte',
            dark: 'ayu-dark',
          },
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji, remarkSectionize],
  },

})
