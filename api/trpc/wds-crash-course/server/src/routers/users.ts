import { z } from "zod";
import { observable } from "@trpc/server/observable";
import stream from "stream";
import t from "../trpc.js";

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new stream.EventEmitter();

const userRouter = t.router({
	get: userProcedure.query(({ input }) => ({ id: input.userId })),
	update: userProcedure.input(z.object({ name: z.string() })).mutation((req) => {
		console.log(`Updating user ${req.input.userId} to have the name ${req.input.name}`);
		eventEmitter.emit("update", req.input.userId);
		return { id: req.input.userId, name: req.input.name };
	}),
	onUpdate: t.procedure.subscription(() =>
		observable<string>((emit) => {
			eventEmitter.on("update", emit.next);

			return () => {
				eventEmitter.off("update", emit.next);
			};
		})
	),
});

export default userRouter;
