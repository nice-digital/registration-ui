const { readdirSync } = require("fs"),
	path = require("path");
	withTranspiledModules = require("next-transpile-modules");

/**
 * A list of paths to node modules that should allow transpilation.
 * Most of our Design System components (and Global Nav) import SCSS.
 *
 * Avoids the error "CSS Modules cannot be imported from within node_modules."
 */
const niceDigitalModulesToTranspile = readdirSync(
	path.join(__dirname, "node_modules", "@nice-digital"),
	{ withFileTypes: true }
)
	.filter((dirent) => dirent.isDirectory())
	.map(({ name }) => `@nice-digital/${name}`);

const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_POST_LOGOUT_REDIRECT: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    BACKEND_URL: process.env.BACKEND_URL,
    INDEV_URL: process.env.INDEV_URL
  }
};

const finalConfig = withTranspiledModules(niceDigitalModulesToTranspile)(nextConfig);

module.exports = finalConfig;
