import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { api } from "@showz/convex/api";
import { Button } from "@showz/ui/components/button";
import { fetchQuery } from "convex/nextjs";

// ROOT ************************************************************************************************************************************
export default async function Page() {
	const { getToken } = await auth();
	const token = (await getToken({ template: "convex" })) ?? undefined;
	const title = await fetchQuery(api.pages.admin, {}, { token });

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">{title}</h1>
				<SignedIn>Yeah, you are signed in</SignedIn>
				<SignedOut>Neah, you are signed out</SignedOut>
				<SignOutButton>
					<Button variant="link" className="cursor-pointer">
						Sign out
					</Button>
				</SignOutButton>
			</div>
		</div>
	);
}
