import { join, resolve, basename } from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: resolve(process.cwd(), '../.env') })
const dev = process.env.NODE_ENV !== 'production'
let {
  HEAD,
  HTTP_ENDPOINT,
  WS_ENDPOINT,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_MAPS_API_KEY,
  ONESIGNAL_APP_ID,
  WWW_URL,
} = require('./config')
// WS_ENDPOINT = dev ? WS_ENDPOINT : 'https://apiv2.misiki.in'
HTTP_ENDPOINT = dev ? HTTP_ENDPOINT : 'https://apiv2.misiki.in'
// console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', HTTP_ENDPOINT, GOOGLE_MAPS_API_KEY)
export const head = HEAD
export const components = true
export const ssr = true
export const loading = '~/shared/components/ui/Loading.vue'
export const css = [
  '~/shared/assets/css/swal.css',
  '~/shared/assets/css/animations.css',
  '~/shared/assets/css/pulse.css',
  '~/shared/assets/css/badge.css',
  '~/shared/assets/css/form.css',
]
export const plugins = [
  { src: '~/shared/plugins/map.js', mode: 'client' },
  { src: '~/shared/plugins/VueYoutube.js', mode: 'client' },
  { src: '~/shared/plugins/swal.js', mode: 'client' },
  { src: '~/shared/plugins/ui.js' },
  { src: '~/shared/plugins/filters.js' },
  { src: '~/shared/plugins/init.js', mode: 'client' },
  { src: '~/shared/plugins/lazy.js', mode: 'client' },
  { src: '~/shared/plugins/carousel.js', mode: 'client' },
  { src: '~/shared/plugins/social.js', mode: 'client' },
  { src: '~/shared/plugins/scroll.js', mode: 'client' },
]
// nuxt-purgecss is required. else it will eliminate All styles used in ~/shared/components (which style is not used any where else)
export const buildModules = [
  '@nuxtjs/apollo',
  'vue-sweetalert2/nuxt',
  // "~/modules/routes",
  '@nuxtjs/robots',
  '@nuxtjs/pwa',
  '@nuxtjs/toast',
  '@nuxtjs/tailwindcss',
  '@nuxt/components',
  'nuxt-purgecss',
  'nuxt-webfontloader',
]
export const webfontloader = {
  google: {
    families: ['Karla:400,700&display=swap'],
  },
}
export const tailwindcss = {
  configPath: '../shared/config/tailwind.config.js',
  cssPath: '~/shared/assets/css/tailwind.css',
  purgeCSSInDev: false,
  exposeConfig: false,
}
export const purgeCSS = {
  content: [`./**/*.vue`, `./../shared/**/*.vue`], // This line will not remove those classes which is used explicitly on shared/components/ folder
  whitelist: ['css-selector-to-whitelist'], // e.g. sweetalert
}
export const modules = [
  '@nuxtjs/proxy',
  'cookie-universal-nuxt',
  '@nuxtjs/google-analytics',
]
// These 2 only used at www
export const pwa = {}
//  export const oneSignal = {
//    init: {
//      appId: ONESIGNAL_APP_ID,
//      allowLocalhostAsSecureOrigin: true,
//      welcomeNotification: {
//        disable: true,
//      },
//    },
//  }

export const googleAnalytics = {
  id: GOOGLE_ANALYTICS_ID,
}
export const server = dev ? 'http://localhost:8888' : WWW_URL
export const apollo = {
  // watchLoading: '../shared/plugins/apollo-watch-loading-handler.js',
  // errorHandler: './plugins/apollo-error-handler.js',
  clientConfigs: {
    default: {
      httpEndpoint: server + '/graphql',
      wsEndpoint: HTTP_ENDPOINT.replace('http', 'ws') + '/graphql',
    },
  },
  defaultOptions: {
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'no-cache',
    },
  },
}
export const toast = {
  theme: 'toasted-primary',
  position: 'bottom-center',
  singleton: true,
  fullWidth: true,
}
// export const pageTransition = {
//   name: 'slide-fade',
// }
// export const layoutTransition = {
//   name: 'slide-fade',
// }
export const publicRuntimeConfig = {
  HTTP_ENDPOINT: HTTP_ENDPOINT,
  WS_ENDPOINT: WS_ENDPOINT,
}
export const proxy = {
  '/graphql': HTTP_ENDPOINT,
  '/api': HTTP_ENDPOINT,
  '/auth': HTTP_ENDPOINT,
  '/images': HTTP_ENDPOINT,
}
export const generate = {
  dir: 'dist',
  fallback: true,
}
export const build = {
  parallel: true,
  postcss: {
    plugins: {
      tailwindcss: join(__dirname, '../shared/config/tailwind.config.js'),
      'postcss-pxtorem': {
        propList: ['*', '!border*'],
      },
    },
  },
}