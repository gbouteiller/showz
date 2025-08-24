import { getToken } from "@convex-dev/better-auth/nextjs";
import { api } from "@showz/convex/api";
import { createAuth } from "@showz/convex/auth";
import { Button } from "@showz/ui/components/button";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "./page.signout";
import { AdminUser } from "./page.user";

// ROOT ************************************************************************************************************************************
export default async function Page() {
	const token = await getToken(createAuth);
	const isAuthenticated = await fetchQuery(api.auth.isAuthenticated, {}, { token });
	if (!isAuthenticated) redirect("/connexion");

	const preloaded = await preloadQuery(api.pages.admin, {}, { token });

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<AdminUser preloaded={preloaded} />
				<SignOutButton />
				<Button asChild variant="link" className="cursor-pointer">
					<Link href="/">Go to Home</Link>
				</Button>
			</div>
		</div>
	);
}
