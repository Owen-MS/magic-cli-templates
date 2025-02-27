import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import { deefaultRouterList } from './router'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/css-vars.scss'
import './styles/index.scss'
import 'uno.css'

const routes = setupLayouts(deefaultRouterList)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
