export const clientUrl =
  (process.env.NODE_ENV === 'production'
    ? 'https://yukbisa.netlify.app/'
    : 'http://localhost:3000/') ||
  (process.env.NODE_ENV === 'staging'
    ? 'https://staging-yukbisa.netlify.app/'
    : 'http://localhost:3000/')

export const redirectUri =
  (process.env.NODE_ENV === 'production'
    ? 'https://yukbisa-api.herokuapp.com/auth/google/callback'
    : 'http://localhost:3001/auth/google/callback') ||
  (process.env.NODE_ENV === 'staging'
    ? 'https://yukbisa-staging-api.herokuapp.com/auth/google/callback'
    : 'http://localhost:3001/auth/google/callback')
