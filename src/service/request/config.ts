let BASE_URL = ''
const TIME_OUT = 3000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://httpbin.org'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://httpbin.org'
}

export { BASE_URL, TIME_OUT }
