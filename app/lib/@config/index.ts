export default {
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_SERVER: typeof window === 'undefined'
}
