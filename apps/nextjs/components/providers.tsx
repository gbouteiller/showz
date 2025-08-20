"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// ROOT ************************************************************************************************************************************
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConvexProvider client={convex}>
			<NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
				{children}
			</NextThemesProvider>
		</ConvexProvider>
	);
}
