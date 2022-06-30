import { extendType, intArg, nonNull, stringArg } from "nexus";

export const PostQuery = extendType({
  type: "Mutation",
  definition(t) {
    t.field("writeDraft", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        authorId: nonNull(stringArg()),
      },
      resolve: (parent, { title, content, authorId }, context) => {
        return context.prisma.post.create({
          data: {
            title,
            content,
            author: {
              connect: { id: authorId },
            },
          },
        });
      },
    });

    t.field("publishDraft", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (parent, { id }, context, info) => {
        return context.prisma.post.update({
          where: { id: Number(id) },
          data: { published: true },
        });
      },
    });

    t.field("deletePost", {
      type: "Post",
      args: {
        id: intArg(),
      },
      resolve: (parent, { id }, context, info) => {
        return context.prisma.post.delete({ where: { id: Number(id) } });
      },
    });
  },
});
