import { createTRPCProxyClient, createWSClient, httpBatchLink, loggerLink, splitLink, wsLink } from "@trpc/client";
import { AppRouter } from "../../server/src/api";

const wsClient = createWSClient({ url: "ws://localhost:3000/trpc" });

const client = createTRPCProxyClient<AppRouter>({
	links: [
		loggerLink(),
		splitLink({
			condition: (op) => op.type === "subscription",
			true: wsLink({ client: wsClient }),
			false: httpBatchLink({ url: "http://localhost:3000/trpc", headers: { Authorization: "TOKEN" } }),
		}),
	],
});

const result = await client.sayHi.query();
console.log(result);
client.logToServer.mutate("Hi from client");
console.log(await client.users.get.query({ userId: "5" }));
console.log(await client.users.update.mutate({ userId: "42", name: "Reza" }));
console.log(await client.secretData.query());

client.users.onUpdate.subscribe(undefined, {
	onData: (id) => {
		console.log(`Updated ${id}`);
	},
});

document.addEventListener("click", () => {
	client.users.update.mutate({ userId: "42", name: "Reza" });
});
