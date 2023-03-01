import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import createContext from "./context.js";

const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create();
const isAdminMiddleware = t.middleware(({ ctx, next }) => {
	if (!ctx.isAdmin) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({ ctx: { user: { id: 1 } } });
});

export default t;
export const adminProcedure = t.procedure.use(isAdminMiddleware);
