import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProvider } from "convex/react";
import type { PropsWithChildren } from "react";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
if (!CONVEX_URL) console.error("missing envar CONVEX_URL");
const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

export default function AppConvexProvider({ children }: PropsWithChildren) {
	return <ConvexProvider client={convexQueryClient.convexClient}>{children}</ConvexProvider>;
}
