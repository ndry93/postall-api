/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

const path = require('path');

const Router = require('koa-joi-router');

const baseName = path.basename(__filename);

const docs = require('../docs');

const { logger } = require('../utils/logger')(__filename);

const poster = require('./poster')(Router);

function applyApiMiddleware(app) {
	// API main routes
	const mainRouter = Router();
	mainRouter.prefix('/api');

	// Docs routes
	let swaggerRoutes = [];
	// fs.readdirSync(__dirname)
	// 	.filter(file => {
	// 		return file.indexOf('.') !== 0 && file.indexOf('_') !== 0 && file !== baseName;
	// 	})
	// 	.forEach(file => {
	// 		const api = require(path.join(__dirname, file))(Router);
	// 		mainRouter.use(api.middleware());
	// 		// Docs generation
	// 		const swaggerSpec = docs.addDocsForRouter(api).generateSpec();
	// 		swaggerRoutes = [...docs.getRoutesForSpec(swaggerSpec)];
	// 	});

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
