import type { ConvexHttpClient } from "convex/browser";
import type { Preloaded } from "convex/react";
import type { FunctionReference, FunctionReturnType } from "convex/server";

declare global {
	declare namespace App {
		interface Locals {
			convex: {
				client: ConvexHttpClient;
				preloadQuery: <Q extends FunctionReference<"query">>(query: Q, ...args: Q["_args"]) => Promise<FunctionReturnType<Q>>;
				fetchQuery: <Q extends FunctionReference<"query">>(query: Q, ...args: Q["_args"]) => Promise<Preloaded<Q>>;
			};
		}
	}
}
