export const prod =
  (process.env.NODE_ENV === 'production'
    ? 'https://yukbisa.netlify.app/'
    : 'http://localhost:3000/') ||
  (process.env.NODE_ENV === 'staging'
    ? 'https://staging-yukbisa.netlify.app/'
    : 'http://localhost:3000/')
