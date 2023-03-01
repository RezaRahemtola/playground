import t, { adminProcedure } from "../trpc.js";
import userRouter from "./users.js";

const appRouter = t.router({
	sayHi: t.procedure.query(() => "Hi"),
	logToServer: t.procedure
		.input((v) => {
			if (typeof v === "string") return v;
			throw new Error("Invalid input: Expected string");
		})
		.mutation((req) => {
			console.log(`Client Says: ${req.input}`);
			return true;
		}),
	secretData: adminProcedure.query(({ ctx }) => {
		console.log(ctx.user);
		return "Super top secret admin data";
	}),
	users: userRouter,
});

export default appRouter;
