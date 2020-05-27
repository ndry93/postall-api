const Koa = require('koa');
const helmet = require('koa-helmet');
const Sentry = require('@sentry/node');
const morgan = require('koa-morgan');

// init KoaJs
const app = new Koa();

// init Sentry if Dsn configured
if (process.env.SENTRY_PROJECT_DSN) {
	Sentry.init({ dsn: process.env.SENTRY_PROJECT_DSN });
}

// middleware
const customDomainHandler = require('../src/middleware/customDomainHandler');
const errorHandler = require('../src/middleware/errorHandler');
// apply middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(customDomainHandler());
app.use(errorHandler());

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

const applyRouter = require('../src/api');

applyRouter(app);

// onError listener
app.on('error', (error, ctx) => {
	Sentry.captureException(error);
	ctx.status = 500;
	ctx.body = {
		message: error.message
	};
});

module.exports = app;
