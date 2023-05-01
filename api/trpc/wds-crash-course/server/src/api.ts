import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import appRouter from "./routers/index.js";
import createContext from "./context.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
	"/trpc",
	createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

const server = app.listen(3000, () => console.log("Server listening at http://localhost:3000"));
applyWSSHandler({
	wss: new WebSocketServer({ server }),
	router: appRouter,
	createContext: () => ({ isAdmin: true }),
});

export type AppRouter = typeof appRouter;
