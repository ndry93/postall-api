const swaggerTags = ['api'];
const { logger } = require('../../utils/logger')(__filename);

module.exports = controller => {
	const routes = [
		{
			method: 'GET',
			path: '/',
			tags: swaggerTags,
			handler: async ctx => {
				logger.info('Called HelloRoutes / ');
				ctx.logger = logger;
				await controller.generateID(ctx);
			}
		}
	];

	return Router => {
		const router = Router();
		router.prefix('/poster');
		router.route(routes);
		return router;
	};
};
