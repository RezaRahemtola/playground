import { IResolvers } from 'apollo-server';

const queries: IResolvers = {
	Query: {
		hello: (): string => 'Hello world',
		personalHello: (_: unknown, args: { name: string }): string => `Hello ${args.name}`,
	},
};

export default queries;
