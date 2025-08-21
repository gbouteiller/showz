import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "@showz/ui/globals.css";

// FONTS ***********************************************************************************************************************************
const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

// ROOT ************************************************************************************************************************************
export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
