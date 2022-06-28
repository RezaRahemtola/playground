import { IResolvers } from 'apollo-server';
import { Category } from '@prisma/client';
import { Context } from '../../context';

const queries: IResolvers = {
	Query: {
		categories: async (_: unknown, args: void, contex: Context): Promise<Category[]> => {
			return contex.db.category.findMany({
				include: {
					products: true,
				},
			});
		},
		category: (_: unknown, args: { id: string }, context: Context): Promise<Category | null> => {
			return context.db.category.findUnique({
				where: {
					id: args.id,
				},
			});
		},
	},
};

export default queries;
