import { extendType, nonNull, stringArg } from "nexus";

export const UserQuery = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signupUser', {
            type: 'User',
            args: {
                email: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            resolve: (parent, { email, name }, ctx, info) => {
                return ctx.prisma.user.create({
                    data: {
                        name,
                        email,
                    }
                })
            }
        })
    }
});