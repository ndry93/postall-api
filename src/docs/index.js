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
					Object.assign(spec, {
						host: ctx.request.host,
						basePath: '/Prod'
					}),
					null,
					'  '
				);
			}
		},
		{
			method: 'get',
			path: '/',
			handler: async ctx => {
				ctx.body =
					'<!DOCTYPE html>\n<html>\n\n<head>\n    <title>Rebilly REST API Specification</title>\n    <!-- needed for adaptive design -->\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="prefetch" href=\'./docs/_api.json\'>\n\n    <!--\n    ReDoc uses font options from the parent element\n    So override default browser styles\n    -->\n    <style>\n        @import url(//fonts.googleapis.com/css?family=Montserrat:400,700);\n\n        body {\n            margin: 0;\n            padding: 0;\n            font-family: Verdana, Geneva, sans-serif;\n            font-size: 14px;\n            color: #333;\n        }\n\n        #redoc_container .menu-content img {\n            padding: 20px 30px 14px 30px;\n        }\n    </style>\n\n    <!-- favicons -->\n    <link rel="icon" type="image/png" href="favicon.png">\n    <meta name="theme-color" content="#0033a0">\n    <link rel="apple-touch-icon-precomposed" href="favicon.png">\n    <link rel="apple-touch-icon-precomposed" media="(resolution: 326dpi)" href="apple-touch-icon-326dpi.png">\n    <link rel="apple-touch-icon-precomposed" media="(resolution: 163dpi)" href="apple-touch-icon-163dpi.png">\n</head>\n\n<body>\n    <div id="redoc_container"></div>\n    <script src="https://redocpro-cdn.redoc.ly/v1.0.0-beta.3/redocpro-standalone.min.js"> </script>\n    <script>\n        RedocPro.init(\'./docs/_api.json\', {\n            showConsole: true,\n            layout: {\n                scope: \'section\',\n            },\n            theme: {\n                colors: {\n                    text: {\n                        primary: \'#333333\'\n                    }\n                },\n                typography: {\n                    fontFamily: "Verdana, Geneva, sans-serif",\n                    fontSize: \'14px\'\n                }\n            }\n        }, document.querySelector(\'#redoc_container\'))\n    </script>\n</body>\n\n</html>';
			}
		}
	];
}

module.exports = {
	addDocsForRouter,
	generateSpec,
	getRoutesForSpec
};
