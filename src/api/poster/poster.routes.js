const swaggerTags = ['api'];

// routes should not contain logger
module.exports = controller => {
	const routes = [
		{
			method: ['GET', 'POST', 'PUT', 'DELETE'],
			path: '/:uid',
			tags: swaggerTags,
			handler: async (ctx, next) => {
				console.log("++++++++ ctx ", ctx);
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
