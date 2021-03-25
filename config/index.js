export const API_URL = 'https://api.litekart.in'
export const tokenExpiry = 60 * 60 * 15 // Login validity (15 minutes)
export const typingTimeout = 0 // After this delay the search api will be fired
export const loadingTimeout = 500 // Loading indicator will be shown after this delay
export const userRoles = ['user', 'vendor', 'manager', 'admin'] // This should be in ascending order of authority. e.g. In this case user will not have access to any other role, where as admin will have the role of user+vendor+manager+admin
export const currency = { symbol: '₹', code: 'INR' }
export const TITLE = 'Online Shopping for Fashion in India'
export const DESCRIPTION =
  'litekart.in offer Online Women Shopping in India. Huge Collection of Jewellery, Handbags, Clutches, Sunglasses, Clothing, Nightwear & More!'
export const KEYWORDS =
  "litekart.in,litekart Accessories,Affordable Luxury,India's Best Women's Online Shopping,Online Jewellery,litekart, online shopping, online jewelry, jewellery, handbags, clutches, sunglasses, ethnic jewellery, nightwear, lingrie, clothing, bracelets, rings, sets, necklace, pendants, earrings, online jewellery in lahore, online shopping in India, litekart online shopping, litekart jewelry"
export const sorts = [
  { name: 'Relevance', val: null },
  { name: 'Whats New', val: '-createdAt' },
  { name: 'Price low to high', val: 'price' },
  { name: 'Price high to low', val: '-price' },
]

export const { PORT = '8888' } = process.env
export const { WWW_URL = `http://localhost:${PORT}` } = process.env

export const { GOOGLE_ANALYTICS_ID = 'UA-49421899-13' } = process.env

export const {
  STRIPE_PUBLISHABLE_KEY = 'pk_test_96u8xKulOOGOLoyc2Jt167fH00DENCsyyF',
} = process.env

export const { ONESIGNAL_APP_ID = '' } = process.env

export const { GOOGLE_MAPS_API_KEY = '' } = process.env

export const { WEBSITE_NAME = 'Litekart' } = process.env
export const dev = process.env.NODE_ENV !== 'production'
export const { HTTP_ENDPOINT = 'https://apiv2.misiki.in' } = process.env

export const head = {
  titleTemplate: '%s - Litekart',
  htmlAttrs: { lang: 'en' },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Nunito&display=swap',
    },
  ],
}
