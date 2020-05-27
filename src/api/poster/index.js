const helloService = require('./poster.service')({
	// db: require("../../../src/utils/db")
});
const helloController = require('./poster.controller')(helloService);

module.exports = require('./poster.routes')(helloController);
