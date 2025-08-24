import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { api } from "@showz/convex/api";
import { parseSetCookieHeader } from "better-auth/cookies";

export const server = {
	signIn: defineAction({
		accept: "form",
		input: z.object({
			email: z.string(),
			password: z.string(),
		}),
		handler: async (input, { locals: { convex }, cookies }) => {
			const cookie = await convex.client.mutation(api.auth.signIn, input);
			if (!cookie) return;
			const parsed = parseSetCookieHeader(cookie);
			parsed.forEach((value, key) => {
				if (!key) return;
				const opts = {
					sameSite: value.samesite,
					secure: value.secure,
					maxAge: value["max-age"],
					httpOnly: value.httponly,
					domain: value.domain,
					path: value.path,
				} as const;
				cookies.set(key, decodeURIComponent(value.value), opts);
			});
			return true;
		},
	}),
};
