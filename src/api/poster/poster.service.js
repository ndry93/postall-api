const { logger } = require('../../utils/logger')(__filename);

module.exports = () => {
	async function checkValidUID(uid) {
		logger.info('execute checkValidUID with uid ', uid);

		const respObj = {
			message: 'Hello'
		};

		const resp = await Promise.resolve(respObj);
		if (resp) return true;
		return false;
	}

	return {
		checkValidUID
	};
};
