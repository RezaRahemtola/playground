import { ApolloServer } from 'apollo-server';
import depthLimit from 'graphql-depth-limit';

import schema from './schema';
import { createContext } from './context';

const serverConfig = {
	port: 5000,
	host: 'localhost',
};

const server = new ApolloServer({
	schema,
	validationRules: [depthLimit(5)],
	context: createContext,
});

server.listen({ ...serverConfig }, () => {
	const { port, host } = serverConfig;
	console.log(`Server listening on http://${host}:${port}/`);
});
