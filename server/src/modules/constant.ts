export const clientUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/'
    : 'https://yukbisa.netlify.app/'

export const redirectUri =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001/auth/google/callback'
    : 'https://yukbisa-api.herokuapp.com/auth/google/callback'
