import { IResolvers } from 'apollo-server';

const mutations: IResolvers = {
	Mutation: {
		add: (_: unknown, args: { number1: number; number2: number }): number => args.number1 + args.number2,
	},
};

export default mutations;
