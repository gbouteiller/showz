"use server";

import { api } from "@showz/convex/api";
import { parseSetCookieHeader } from "better-auth/cookies";
import { fetchMutation } from "convex/nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
	const cookie = await fetchMutation(api.auth.signIn, { email, password });
	if (!cookie) return;

	const cookieStore = await cookies();
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
		cookieStore.set(key, decodeURIComponent(value.value), opts);
	});

	redirect("/admin");
}
