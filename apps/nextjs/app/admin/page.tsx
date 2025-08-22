import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { api } from "@showz/convex/api";
import { Button } from "@showz/ui/components/button";
import { preloadQuery } from "convex/nextjs";
import Link from "next/link";
import { AdminUser } from "./page.user";

// ROOT ************************************************************************************************************************************
export default async function Page() {
	const { getToken } = await auth();
	const token = (await getToken({ template: "convex" })) ?? undefined;
	const preloaded = await preloadQuery(api.pages.admin, {}, { token });

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<AdminUser preloaded={preloaded} />
				<SignedIn>Yeah, you are signed in</SignedIn>
				<SignedOut>Neah, you are signed out</SignedOut>
				<SignOutButton>
					<Button variant="link" className="cursor-pointer">
						Sign out
					</Button>
				</SignOutButton>
				<Button asChild variant="link" className="cursor-pointer">
					<Link href="/">Go to Home</Link>
				</Button>
			</div>
		</div>
	);
}
