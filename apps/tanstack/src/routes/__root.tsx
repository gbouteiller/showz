import type { ConvexQueryClient } from "@convex-dev/react-query";
import appCss from "@showz/ui/globals.css?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/components/theme-provider";

// ROUTE ***********************************************************************************************************************************
export const Route = createRootRouteWithContext<{
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "TanStack Start Starter" }],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	shellComponent: RootDocument,
});

// ROOT ************************************************************************************************************************************
function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider>
					{children}
					<TanStackDevtools
						config={{ position: "bottom-left" }}
						plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
					/>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
