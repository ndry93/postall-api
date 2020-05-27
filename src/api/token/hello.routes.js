const swaggerTags = ['api'];
const { logger } = require('../../utils/logger')(__filename);

function HelloRoutes(helloController) {
	const routes = [
		{
			method: 'GET',
			path: '/',
			tags: swaggerTags,
			handler: async ctx => {
				logger.info('Called HelloRoutes / ');
				await helloController.getHelloWorld(ctx);
			}
		}
	];

	return Router => {
		const router = Router();
		router.prefix('/hello');
		router.route(routes);
		return router;
	};
}

module.exports = HelloRoutes;
