/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-multi-assign */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable prefer-template */

const stringHelper = require('../utils/stringHelper');

function customDomainHandler() {
	return async (ctx, next) => {
		if (!!ctx.request.headers['x-apigateway-event']) {
			const event = JSON.parse(decodeURIComponent(ctx.request.headers['x-apigateway-event']));
			const params = event.pathParameters || {};
			const replaceParams = (acc, k) => {
				if (k == 'proxy' && acc.includes('{proxy+}')) {
					return acc.replace('{proxy+}', unescape(params[k]));
				}
				if (k == 'proxy' && acc.includes('{proxy*}')) {
					return acc.replace('{proxy*}', unescape(params[k]));
				}
				return acc.replace('{' + k + '}', unescape(params[k]));
			};

			let interpolatedResource = Object.keys(params).reduce(replaceParams, event.resource);

			// covers trailing slash cornercase, since trailing slashes are not returned in event.resource .
			if (event.path.endsWith('/') && !interpolatedResource.endsWith('/')) {
				interpolatedResource = `${interpolatedResource}/`;
			}

			if (event.queryStringParameters) {
				interpolatedResource += stringHelper.jsonToQueryString(event.queryStringParameters);
			}

			if (!!event.path && !!interpolatedResource && event.path != interpolatedResource) {
				ctx.request.url = ctx.request.originalUrl = interpolatedResource;
				// if (opts.onRouted && typeof opts.onRouted === 'function') {
				//   opts.onRouted(event.path, interpolatedResource);
				// }
			}
		}
		await next();
	};
}

module.exports = customDomainHandler;
