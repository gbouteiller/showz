import { PUBLIC_CONVEX_URL } from "astro:env/client";
import { JWT_COOKIE_NAME } from "@convex-dev/better-auth/plugins";
import { createAuth } from "@showz/convex/auth";
import type { AstroCookies } from "astro";
import { defineMiddleware, sequence } from "astro/middleware";
import { createCookieGetter, getSessionCookie } from "better-auth/cookies";
import { ConvexHttpClient } from "convex/browser";
import type { Preloaded } from "convex/react";
import { type FunctionReference, type FunctionReturnType, getFunctionName } from "convex/server";
import { convexToJson } from "convex/values";
import type { ArgsAndOptions } from "node_modules/convex/dist/cjs-types/server";

const convexClient = new ConvexHttpClient(PUBLIC_CONVEX_URL);
// @ts-expect-error
convexClient.setFetchOptions({ cache: "no-store" });

const fetchQuery = <Q extends FunctionReference<"query">>(
	query: Q,
	...args: ArgsAndOptions<Q, { token?: string }>
): Promise<FunctionReturnType<Q>> => {
	const [fnArgs, options] = args;
	if (options?.token) convexClient.setAuth(options.token);
	return convexClient.query(query, fnArgs);
};

const preloadQuery = async <Q extends FunctionReference<"query">>(
	query: Q,
	...args: ArgsAndOptions<Q, { token?: string }>
): Promise<Preloaded<Q>> => {
	const value = await fetchQuery(query, ...args);
	return {
		_name: getFunctionName(query),
		_argsJSON: convexToJson(args[0] ?? {}),
		_valueJSON: convexToJson(value),
	} as Preloaded<Q>;
};

const withConvex = defineMiddleware((context, next) => {
	context.locals.convex = { client: convexClient, fetchQuery, preloadQuery };
	return next();
});

const getToken = async (cookies: AstroCookies) => {
	const auth = createAuth({} as any);
	const createCookie = createCookieGetter(auth.options);
	const cookie = createCookie(JWT_COOKIE_NAME);
	const tokenCookie = cookies.get(cookie.name);

	// Warn if there's a secure cookie mismatch between Convex and Astro
	if (!tokenCookie?.value) {
		const isSecure = cookie.name.startsWith("__Secure-");
		const insecureCookieName = cookie.name.replace("__Secure-", "");
		const insecureCookie = cookies.get(insecureCookieName);
		const secureCookieName = isSecure ? cookie.name : `__Secure-${insecureCookieName}`;
		const secureCookie = cookies.get(secureCookieName);
		if (isSecure && insecureCookie)
			console.warn(`Looking for secure cookie ${cookie.name} but found insecure cookie ${insecureCookie.value}`);
		if (!isSecure && secureCookie) console.warn(`Looking for insecure cookie ${cookie.name} but found secure cookie ${secureCookie.value}`);
	}
	return tokenCookie?.value;
};

const withBetterAuth = defineMiddleware(async (context, next) => {
	context.locals.auth = { getToken: () => getToken(context.cookies) };
	const sessionCookie = getSessionCookie(context.request);
	if (!sessionCookie && context.url.pathname.startsWith("/admin")) return context.redirect("/connexion");
	return next();
});

export const onRequest = sequence(withConvex, withBetterAuth);
