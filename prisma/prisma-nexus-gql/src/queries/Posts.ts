import { extendType, idArg, nonNull } from "nexus";

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getPosts", {
      type: "Post",
      resolve(parent, args, context) {
        return context.prisma.post.findMany();
      },
    });

    t.list.field("getPostsByUser", {
      type: "Post",
      args: {
        authorId: nonNull(idArg()),
      },
      resolve: (parent, { authorId }, context) => {
        return context.prisma.post.findMany({ where: { authorId: authorId } });
      },
    });

    t.list.field("getPublishedPosts", {
      type: "Post",
      resolve: (parent, args, context) => {
        return context.prisma.post.findMany({ where: { published: true } });
      },
    });
  },
});
