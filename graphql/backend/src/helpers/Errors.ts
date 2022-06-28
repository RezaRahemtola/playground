import { ApolloError } from 'apollo-server';

export class NotFoundError extends ApolloError {
	name = 'Not found error';

	constructor(message: string) {
		super(message, 'NOT_FOUND_CODE');
	}
}

export class InvalidArguments extends ApolloError {
	name = 'Invalid arguments';

	constructor(message: string) {
		super(message, 'INVALID_ARGUMENTS_CODE');
	}
}
