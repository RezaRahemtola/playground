import { makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import 'graphql-import-node';

import * as typeDefs from './schema/schema.graphql';
import resolvers from './resolver';

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

export default schema;
