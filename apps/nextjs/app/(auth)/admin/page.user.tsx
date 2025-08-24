"use client";

import type { api } from "@showz/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function AdminUser({ preloaded }: { preloaded: Preloaded<typeof api.pages.admin> }) {
	const title = usePreloadedQuery(preloaded);
	return <h1 className="text-2xl font-bold">{title}</h1>;
}
