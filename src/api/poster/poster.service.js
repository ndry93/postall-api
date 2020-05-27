const { logger } = require('../../utils/logger')(__filename);

function HelloService() {
	async function getHello() {
		logger.info('execute getHello');

		const respObj = {
			message: 'Hello'
		};

		return Promise.resolve(respObj);
	}

	async function getWorld() {
		logger.info('execute getWorld');

		const respObj = {
			message: 'World'
		};

		return Promise.resolve(respObj);
	}

	return {
		getHello,
		getWorld
	};
}
module.exports = HelloService;
