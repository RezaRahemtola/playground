/// <reference path="./generated/nexus.ts" />


import * as path from 'path';

import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma'

import * as Entities from './entities';
import * as Queries from './queries';
import * as Mutations from './mutations'

const schema = makeSchema({
    plugins: [nexusPrisma({
        experimentalCRUD: true
    })],
    types: [Entities, Queries, Mutations],
    outputs: {
        schema: path.join(__dirname, '../schema.graphql'),
        typegen: path.join(__dirname, '/generated/nexus.ts'),
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: require.resolve('.prisma/client/index.d.ts'),
                alias: 'prisma',
            },
        ],
    },
});

export default schema;