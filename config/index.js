// export const LOCAL_HTTP_ENDPOINT = 'http://localhost:6600'
// export const LOCAL_WS_ENDPOINT = 'ws://localhost:6600'
export const REMOTE_HTTP_ENDPOINT = 'https://apiv2.misiki.in'
export const REMOTE_WS_ENDPOINT = 'wss://apiv2.misiki.in'
export const GOOGLE_ANALYTICS_ID = 'UA-49421899-4'
export const WWW_URL = 'https://www.misiki.in'
// export const snackTimer = 5000// Used for the snackbar
export const typingTimeout = 200; // After this delay the search api will be fired
export const loadingTimeout = 500; // Loading indicator will be shown after this delay // used at Loading.vue of admin


// const {HTTP_ENDPOINT=REMOTE_HTTP_ENDPOINT} = process.env
export const {WS_ENDPOINT=REMOTE_WS_ENDPOINT} = process.env
export const {ONESIGNAL_APP_ID} = process.env

export const dev = process.env.NODE_ENV !== 'production'
export const HTTP_ENDPOINT = dev ? process.env.HTTP_ENDPOINT : 'https://apiv2.misiki.in'

export const HEAD = {
  titleTemplate: '%s - Misiki',
  htmlAttrs: { lang: 'en' },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
  ],
}
