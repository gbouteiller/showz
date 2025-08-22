import type { api } from "@showz/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import { withConvex } from "@/lib/convex";

export const AdminUser = withConvex(({ preloaded }: { preloaded: Preloaded<typeof api.pages.admin> }) => {
	const title = usePreloadedQuery(preloaded);
	return <h1 className="text-2xl font-bold">{title}</h1>;
});
