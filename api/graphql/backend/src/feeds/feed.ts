import { /* Category, */ Product, PrismaClient } from '@prisma/client';

const client = new PrismaClient();

// type CategoryFeed = Omit<Category, 'id'>;
type ProductFeed = Omit<Product, 'id'>;

// const categories: CategoryFeed[] = [
// 	{ name: 'Games' },
// 	{ name: 'Foods' },
// 	{ name: 'Animals' },
// ];

const products: { category: string; products: ProductFeed[] }[] = [
	{
		category: 'Games',
		products: [
			{ name: 'Mario Bros', desc: 'A cool game', price: 15 },
			{ name: 'Zelda', desc: 'A cool game', price: 20 },
			{ name: 'Pokemon X', desc: 'A cool games about monsters', price: 15 },
			{ name: 'Pokemon Y', desc: 'A cool games about monsters', price: 15 },
			{ name: 'Mario Cart', desc: 'A cool race game', price: 15 },
			{ name: 'Animal Crossing', desc: 'Create a life in a game', price: 20 },
		],
	},
	{
		category: 'Foods',
		products: [
			{ name: 'Pasta', desc: 'Loved by students', price: 10 },
			{ name: 'Steak', desc: 'A cool piece of meat', price: 10 },
			{ name: 'Rice', desc: 'Loved by students', price: 10 },
			{ name: 'Salad', desc: 'We all love it (or not)', price: 10 },
			{ name: 'Butter', desc: 'The best things to cooks', price: 10 },
		],
	},
	{
		category: 'Animals',
		products: [
			{ name: 'Cat', desc: 'Loved by all', price: 10 },
			{ name: 'Dog', desc: 'Loved by all', price: 10 },
			{ name: 'Fish', desc: 'Loved by all', price: 10 },
			{ name: 'Snake', desc: 'Loved by almost all', price: 10 },
		],
	},
];

async function feed() {
	console.log('** FEED DATABASE **');

	await Promise.all(
		products.map(async (product) => {
			console.log(`Create products for ${product.category}`);

			await client.category.create({
				data: {
					name: product.category,
					products: {
						create: product.products,
					},
				},
			});
		}),
	);
}

feed().then(() => console.log('** FEED FINISH **'));
