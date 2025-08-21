"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function Providers({ children }: PropsWithChildren) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
			{children}
		</ThemeProvider>
	);
}
