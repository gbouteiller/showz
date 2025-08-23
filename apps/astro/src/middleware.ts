import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { defineMiddleware, sequence } from "astro/middleware";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);
// const convexClient = new ConvexHttpClient(PUBLIC_CONVEX_URL);
// // @ts-expect-error
// convexClient.setFetchOptions({ cache: "no-store" });

// const fetchQuery = <Q extends FunctionReference<"query">>(query: Q, ...args: Q["_args"]): Promise<FunctionReturnType<Q>> =>
// 	convexClient.query(query, ...args);

// const preloadQuery = async <Q extends FunctionReference<"query">>(query: Q, ...args: Q["_args"]): Promise<Preloaded<Q>> => {
// 	const value = await fetchQuery(query, ...args);
// 	return {
// 		_name: getFunctionName(query),
// 		_argsJSON: convexToJson(args[0] ?? {}),
// 		_valueJSON: convexToJson(value),
// 	} as Preloaded<Q>;
// };

const withClerk = defineMiddleware(
	clerkMiddleware(async (auth, context, next) => {
		const { getToken, redirectToSignIn, userId } = auth();
		const token = (await getToken({ template: "convex" })) ?? undefined;
		// if (token) context.locals.convex.client.setAuth(token);
		return !userId && isProtectedRoute(context.request) ? redirectToSignIn() : next();
	}),
);

// const withConvex = defineMiddleware((context, next) => {
// 	context.locals.convex = { client: convexClient, fetchQuery, preloadQuery };
// 	return next();
// });

export const onRequest = sequence(withClerk);
