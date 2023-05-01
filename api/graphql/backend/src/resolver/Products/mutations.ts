import { IResolvers } from 'apollo-server';
import { Product } from '@prisma/client';
import { Context } from '../../context';
import { InvalidArguments, NotFoundError } from '../../helpers/Errors';

type ProductInput = {
	name: string;
	desc: string;
	price: number;
	categories: Array<string>;
};

const mutations: IResolvers = {
	Mutation: {
		createProduct: async (_: unknown, args: { input: ProductInput }, contex: Context): Promise<Product> => {
			const { name, desc, price, categories } = args.input;

			if (name === undefined || desc === undefined || price === undefined) {
				throw new InvalidArguments('Missing arguments');
			}
			if (price < 0) {
				throw new InvalidArguments('Price must be positive');
			}

			let connect: Array<{ id: string }> = [];
			if (categories !== undefined) {
				connect = categories.map((elem) => ({ id: elem }));
			}

			return contex.db.product.create({
				data: {
					name,
					desc,
					price,
					categories: { connect },
				},
				include: {
					categories: true,
				},
			});
		},
		updateProduct: async (
			_: unknown,
			args: { id: string; input: ProductInput },
			context: Context,
		): Promise<Product> => {
			const { id } = args;
			const { name, desc, price, categories } = args.input;
			const product = await context.db.product.findUnique({ where: { id } });

			if (product == null) {
				throw new NotFoundError('Product not found');
			}
			if (price < 0) {
				throw new InvalidArguments('Price must be positive');
			}
			let connect: Array<{ id: string }> = [];
			if (categories !== undefined) {
				connect = categories.map((elem) => ({ id: elem }));
			}

			return context.db.product.update({
				where: { id },
				data: {
					name,
					desc,
					price,
					categories: { connect },
				},
				include: {
					categories: true,
				},
			});
		},
		deleteProduct: async (_: unknown, args: { id: string }, context: Context): Promise<Product> => {
			const { id } = args;
			const product = await context.db.product.findUnique({ where: { id } });

			if (product == null) {
				throw new NotFoundError('Product not found');
			}
			return context.db.product.delete({
				where: { id },
				include: {
					categories: true,
				},
			});
		},
	},
};

export default mutations;
