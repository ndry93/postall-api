const { logger } = require('../../utils/logger')(__filename);

module.exports = services => {
	async function showRequest(ctx) {
		const { request, response } = ctx;
		logger.child({ uid: ctx.params.uid });
		logger.info('uid ', ctx.params.uid);
		logger.info('showRequest ', ctx.request);
		const isValid = services.posterService.checkValidUID(ctx.params.uid);
		logger.info('is uid valid ', isValid);
		if (!isValid) {
			response.status = 404;
			ctx.throw(404, 'uid is invalid or expired');
		}

		response.status = 200;

		const responseData = {
			request: {
				method: request.method,
				header: request.header,
				url: request.url,
				body: request.body
			},
			response: {
				status: response.status,
				message: response.message,
				header: response.header,
				body: response.body
			}
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
