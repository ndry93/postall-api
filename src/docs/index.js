const { SwaggerAPI } = require('koa-joi-router-docs');

const generator = new SwaggerAPI();

function addDocsForRouter(router, prefix) {
	generator.addJoiRouter(router, {
		prefix
	});
	return this;
}

function generateSpec() {
	return generator.generateSpec(
		{
			info: {
				title: 'PostAll.id APIs',
				description: 'API Documentation',
				version: '1'
			},
			basePath: '/',
			tags: [
				{
					name: 'api',
					description: ''
				}
			]
		},
		{
			defaultResponses: {
				200: {
					description: 'Success'
				},
				500: {
					description: 'ERROR'
				}
			}
		}
	);
}

function getRoutesForSpec(spec) {
	return [
		{
			method: 'get',
			path: '/_api.json',
			handler: async ctx => {
				ctx.body = JSON.stringify(
					spec,
					null,
					'  '
				);
			}
		},
		{
			method: 'get',
			path: '/docs',
			handler: async ctx => {
				ctx.body = `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<title>Example API</title>
				</head>
				<body>
					<redoc spec-url='/api/_api.json' lazy-rendering></redoc>
					<script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
				</body>
				</html>
				`;
			}
		}
	];
}

module.exports = {
	addDocsForRouter,
	generateSpec,
	getRoutesForSpec
};
