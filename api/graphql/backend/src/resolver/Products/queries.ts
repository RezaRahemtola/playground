import { IResolvers } from 'apollo-server';
import { Product } from '@prisma/client';
import { Context } from '../../context';

const queries: IResolvers = {
	Query: {
		products: async (_: unknown, args: void, context: Context): Promise<Product[]> => {
			return context.db.product.findMany({
				include: {
					categories: true,
				},
			});
		},
		product: (_: unknown, args: { id: string }, context: Context): Promise<Product | null> => {
			return context.db.product.findUnique({
				where: {
					id: args.id,
				},
			});
		},
	},
};

export default queries;
