const { logger } = require('../../utils/logger')(__filename);

module.exports = services => {
	async function showRequest(ctx) {
		const { request, response, params } = ctx;
		logger.child({ uid: params.uid });
		logger.info('uid ', params.uid);
		logger.info('showRequest ', request);
		const isValid = services.posterService.checkValidUID(params.uid);
		logger.info('is uid valid ', isValid);
		if (!isValid) {
			response.status = 404;
			ctx.throw(404, 'uid is invalid or expired');
		}

		response.status = 200;

		// need to save this into nosql db
		const responseData = [
			{
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
			}
		];

		// need to retrieve all response data
		logger.info('responseData ', responseData);

		ctx.body = {
			data: responseData
		};
	}

	async function deleteUID(ctx) {
		const { request, response } = ctx;
	}

	async function createUID(ctx) {
		const { request, response } = ctx;
	}

	return {
		showRequest,
		deleteUID,
		createUID
	};
};
