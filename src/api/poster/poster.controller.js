module.exports = helloService => {
	async function generateID(ctx) {
		const childLogger = ctx.logger.child({ requestID: '123 ' });
		const hello = await helloService.getHello();
		const world = await helloService.getWorld();
		const data = `${hello.message} ${world.message}`;
		childLogger.info(data);
		ctx.body = data;
	}

	return {
		generateID
	};
};
