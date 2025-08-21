import { query } from "./_generated/server";

export const home = query({
	args: {},
	handler: async () => "Home",
});

export const admin = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		return identity?.name ?? "Anonymous";
	},
});
