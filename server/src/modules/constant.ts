export const prod =
  process.env.NODE_ENV === 'production'
    ? 'https://yukbisa.netlify.app/'
    : 'http://localhost:3000/'
