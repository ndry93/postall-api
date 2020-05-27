const logger = require('pino')();

function initLogger(sourceName) {
	const child = logger.child({
		application: 'post-all',
		sourceName
	});
	if (process.env.NODE_ENV === 'production') {
		child.level = 'error';
	} else {
		child.level = 'info';
	}
	child.info('post-all logger start ', child.level);

	return {
		logger: child
	};
}
module.exports = initLogger;
