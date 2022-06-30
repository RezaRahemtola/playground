import { objectType } from 'nexus';

export const Post = objectType({
    name: 'Post',
    description: 'Post table',
    definition(t) {
		t.model.id({
			description: "Post id",
		});
		t.model.title({
			description: "Post title",
		});
		t.model.content({
			description: "Post content",
		});
		t.model.published({
			description: "Post is published ?",
		});
		t.model.author({
			description: "Post description",
		});
		t.model.authorId({
			description: "Post user id"
		});
    },
});
