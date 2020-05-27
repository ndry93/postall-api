const { logger } = require('../../utils/logger')(__filename);

module.exports = services => {
	async function showRequest(ctx) {
		logger.child({ uid: ctx.params.uid });
		logger.info('uid ', ctx.params.uid);
		logger.info('showRequest ', ctx.request);
		const isValid = services.posterService.checkValidUID(ctx.params.uid);
		logger.info('is uid valid ', isValid);

		const response = {
			...ctx.request,
			...ctx.request.body
		};
		console.log('-------ctx.request.body ', ctx.request.body);
		ctx.body = {
			data: {
				request: ctx.request,
				response: ctx.response
			}
		};
	}

	return {
		showRequest
	};
};
