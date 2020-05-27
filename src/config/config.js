/**
 * Rules
 * - database table name should not contain environment name
 * - base url should not have trailing slash (not recommended: http://localhost:8080/ , recommended: http://localhost:8080)
 * - process.env.NODE_ENV will be set during build (e.g cross-env NODE_ENV=staging node index.js)
 * - process.env should not be called outside configuration file
 */

require(`dotenv`).config();
const promiseSecrets = require('../../server/secrets');

const env = process.env.NODE_ENV || 'development';

const configs = {
	development: {
		env,
		PORT: 3000

		// TO-DO: add development environment variables
	},
	staging: {
		env,
		PORT: 3000

		// TO-DO: add staging environment variables
	},
	production: {
		env,
		PORT: 80

		// TO-DO: add production environment variables
	}
};

const configObj = configs[env];

promiseSecrets().then(data => {
	// TO-DO: secrets from ASM
});

// https://nodejs.org/api/modules.html#module_caching
// Caching Modules are cached after the first time they are loaded.
// This means (among other things) that every call to require('foo') will get exactly the same object returned,
// if it would resolve to the same file.
// Multiple calls to require('foo') may not cause the module code to be executed multiple times.
// This is an important feature. With it, "partially done" objects can be returned,
// thus allowing transitive dependencies to be loaded even when they would cause cycles.
// If you want to have a module execute code multiple times, then export a function, and call that function.
module.exports = configObj;
