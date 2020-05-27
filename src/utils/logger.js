const logger = require('pino')();

function initLogger(sourceName) {
	const child = logger.child({
		application: 'futuready-th-integration-api',
		sourceName
	});
	if (process.env.NODE_ENV === 'production') {
		child.level = 'error';
	} else {
		child.level = 'info';
	}
	child.info('futuready-th-integration-api logger start ', child.level);

	return {
		logger: child
	};
}
module.exports = initLogger;
