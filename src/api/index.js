/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const Router = require('koa-joi-router');

const docs = require('../docs');

const { logger } = require('../utils/logger')(__filename);

const poster = require('./poster')(Router);

function applyApiMiddleware(app) {
	// API main routes
	const mainRouter = Router();
	mainRouter.prefix('/api');

	// Docs routes
	let swaggerRoutes = [];

	mainRouter.use(poster.middleware());
	swaggerRoutes = [...docs.getRoutesForSpec(docs.addDocsForRouter(poster).generateSpec())];

	logger.info('router initiated ', mainRouter);
	const docsRouter = Router();
	docsRouter.prefix('/docs');
	docsRouter.route(swaggerRoutes);
	app.use(mainRouter.middleware())
		.use(mainRouter.router.allowedMethods())
		.use(docsRouter.middleware());
}

module.exports = applyApiMiddleware;
