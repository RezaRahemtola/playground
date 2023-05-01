export interface Category {
	name: string;
	products: Array<Product>
}

export interface Product {
	name: string;
	desc: string;
	price: number;
	categories: Array<Category>;
}