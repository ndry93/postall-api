const swaggerTags = ['api'];

// routes should not contain logger
module.exports = controller => {
	const routes = [
		{
			method: ['GET', 'POST', 'PUT', 'DELETE'],
			path: '/:uid',
			meta: {
				swagger: {
					summary: 'Poster',
					description: `Monitor http request and response`,
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				await controller.showRequest(ctx);
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
