import { IResolvers } from 'apollo-server';

import queries from './queries';
import mutations from './mutations';

const resolvers: Array<IResolvers> = [queries, mutations];

export default resolvers;
