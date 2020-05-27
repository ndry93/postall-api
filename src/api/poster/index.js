const posterService = require('./poster.service')({
	// db: require("../../../src/utils/db")
});

// controller function takes option argument
const controller = require('./poster.controller')({
	posterService
});

module.exports = require('./poster.routes')(controller);
