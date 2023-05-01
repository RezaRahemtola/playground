import { IResolvers } from 'apollo-server';

import products from './Products';
import categories from './Categories';
import hello from './Hello';

const resolvers: Array<IResolvers> = [...categories, ...products, ...hello];

export default resolvers;
