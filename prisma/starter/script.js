const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

function getUsers() {
	return prisma.user.findMany();
}

function getPosts() {
	return prisma.post.findMany();
}

function addUser(name, email) {
	return prisma.user.create({
		data: {
			name,
			email
		}
	});
}

function addPost(title, content, authorId) {
	return prisma.post.create({
	  data: {
		title,
		content,
		author: {
		  connect: {
			id: authorId,
		  },
		},
	  },
	});
}

function getPostsByUsers(authorId) {
	return prisma.post.findMany({ where: { authorId } });
}

function removeUser(id) {
	return prisma.user.delete({ where: { id } });
}

function removePost(id) {
	return prisma.post.delete({ where: { id } });
}

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  console.log("getUsers:\n", await getUsers());
  console.log("getPosts:\n", await getPosts());
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
