import { query } from "./_generated/server";

export const hello = query({
	args: {},
	handler: async () => "Hello, world",
});
