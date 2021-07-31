module.exports = {
  reactStrictMode: true,
  webpack5: false,
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_POST_LOGOUT_REDIRECT: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    APIGatewayAddress: process.env.APIGatewayAddress
  }
}