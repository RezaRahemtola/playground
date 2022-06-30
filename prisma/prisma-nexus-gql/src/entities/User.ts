import { objectType } from 'nexus';

export const User = objectType({
    name: 'User',
    description: 'User table',
    definition(t) {
        t.model.id({
            description: 'User id'
        });
        t.model.name({
            description: 'User name'
        });
        t.model.email({
            description: 'User email'
        });
        t.model.posts({
            pagination: false,
        });
    },
});