require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

// const config = require('../config');

let promiseSecrets;
const secretName = "postall-api-app-secrets";
if (process.env.NODE_ENV !== 'development') {
	// console.log('----- ', config.env);
	const region = 'ap-southeast-1';

	// Create a Secrets Manager client
	const secretsManager = new AWS.SecretsManager({
		region
	});

	promiseSecrets = async () => {
		try {
			const data = await secretsManager
				.getSecretValue({
					SecretId: secretName
				})
				.promise();

			if (data) {
				if (data.SecretString) {
					const secret = data.SecretString;
					const parsedSecret = JSON.parse(secret);
					return {
						secrets: parsedSecret
					};
				}

				const binarySecretData = data.SecretBinary;
				return binarySecretData;
			}
		} catch (error) {
			console.log('Error retrieving secrets');
			if (error.code === 'DecryptionFailureException')
				// Secrets Manager can't decrypt the protected secret text using the provided KMS key.
				// Deal with the exception here, and/or rethrow at your discretion.
				throw error;
			else if (error.code === 'InternalServiceErrorException')
				// An error occurred on the server side.
				// Deal with the exception here, and/or rethrow at your discretion.
				throw error;
			else if (error.code === 'InvalidParameterException')
				// You provided an invalid value for a parameter.
				// Deal with the exception here, and/or rethrow at your discretion.
				throw error;
			else if (error.code === 'InvalidRequestException')
				// You provided a parameter value that is not valid for the current state of the resource.
				// Deal with the exception here, and/or rethrow at your discretion.
				throw error;
			else if (error.code === 'ResourceNotFoundException') {
				// We can't find the resource that you asked for.
				// Deal with the exception here, and/or rethrow at your discretion.
				console.log(
					`Please make sure secrets are stored in plain text in your AWS account with secret name as "${secretName}"`
				);
				throw error;
			}
			// Unknown error occured
			else throw error;
		}
		return undefined;
	};
} else {
	promiseSecrets = async () => {
		let envSecret;
		try {
			envSecret = JSON.parse(fs.readFileSync(process.env.SECRETS_JSON_CONFIG, 'utf8'));
		} catch (error) {
			console.log(
				`No or improperly defined app secrets config file path in environment variable "SECRETS_JSON_CONFIG": ${error}`
			);
			envSecret = {};
		}
		return envSecret;
	};
}
module.exports = promiseSecrets;
