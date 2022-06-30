import { ApolloServer } from "apollo-server";

import schema from './schema';
import { createContext } from './context'

const server = new ApolloServer({
    schema,
    context: createContext(),
});

const HOST = 'localhost'
const PORT = 3000;

server.listen({ port: PORT, host: HOST }, () => {
    console.log(
        `🚀 Server ready at: http://${HOST}:${PORT}\n⭐️ See sample queries: http://pris.ly/e/js/graphql-apollo-server#using-the-graphql-api`,
    )
});