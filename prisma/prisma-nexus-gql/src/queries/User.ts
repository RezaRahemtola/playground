import { extendType } from "nexus";

export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('getUsers', {
            type: 'User',
            resolve: (parent, args, ctx) => {
                return ctx.prisma.user.findMany();
            }
        });
    }
});