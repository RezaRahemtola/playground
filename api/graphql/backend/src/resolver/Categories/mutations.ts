import { IResolvers } from 'apollo-server';
import { Category } from '@prisma/client';
import { Context } from '../../context';
import { InvalidArguments, NotFoundError } from '../../helpers/Errors';

type CategoryInput = {
	name: string;
	products: Array<string>;
};

const mutations: IResolvers = {
	Mutation: {
		createCategory: async (_: unknown, args: { input: CategoryInput }, context: Context): Promise<Category> => {
			const { name, products } = args.input;

			if (name === undefined) {
				throw new InvalidArguments('Missing arguments');
			}

			let connect: Array<{ id: string }> = [];
			if (products !== undefined) {
				connect = products.map((element) => ({ id: element }));
			}

			return context.db.category.create({
				data: {
					name,
					products: { connect },
				},
				include: {
					products: true,
				},
			});
		},

		updateCategory: async (
			_: unknown,
			args: { id: string; input: CategoryInput },
			context: Context,
		): Promise<Category | null> => {
			const { id } = args;
			const { name, products } = args.input;
			const product = await context.db.category.findUnique({ where: { id } });

			if (product === null) {
				throw new NotFoundError('Category not found');
			}

			let connect: Array<{ id: string }> = [];
			if (products !== undefined) {
				connect = products.map((e) => ({ id: e }));
			}

			return context.db.category.update({
				where: { id },
				data: {
					name,
					products: { connect },
				},
				include: {
					products: true,
				},
			});
		},

		deleteCategory: async (_: unknown, args: { id: string }, context: Context): Promise<Category> => {
			const { id } = args;
			const product = await context.db.category.findUnique({ where: { id } });

			if (product === null) {
				throw new NotFoundError('Category not found');
			}

			return context.db.category.delete({
				where: { id },
				include: {
					products: true,
				},
			});
		},
	},
};

export default mutations;
