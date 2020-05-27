const { logger } = require('../../utils/logger')(__filename);

module.exports = services => {
	async function showRequest(ctx) {
		logger.child({ uid: ctx.params.uid });
		logger.info('uid ', ctx.params.uid);
		logger.info('showRequest ', ctx.request);
		const isValid = services.posterService.checkValidUID(ctx.params.uid);
		logger.info('is uid valid ', isValid);

		const { request, response } = ctx;

		const httpReqObj = { request, body: request.body };
		const httpResObj = { response, body: response.body };

		const responseData = {
			request: httpReqObj,
			response: httpResObj
		};

		logger.info('responseData ', responseData);

		ctx.body = {
			data: responseData
		};
	}

	return {
		showRequest
	};
};
