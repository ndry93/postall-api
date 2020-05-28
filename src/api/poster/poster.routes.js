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
		},
		{
			method: ['DELETE'],
			path: '/delete/:uid',
			meta: {
				swagger: {
					summary: 'Poster uid remover',
					description: `Poster uid remover endpoint`,
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				await controller.deleteUID(ctx);
			}
		},
		{
			method: ['POST'],
			path: '/create/:uid',
			meta: {
				swagger: {
					summary: 'Poster uid creator',
					description: `Poster uid creator endpoint`,
					swaggerTags
				}
			},
			handler: async (ctx, next) => {
				await controller.createUID(ctx);
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
