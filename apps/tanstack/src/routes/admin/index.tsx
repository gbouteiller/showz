import { SignedIn, SignedOut, SignOutButton } from "@clerk/tanstack-react-start";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@showz/convex/api";
import { Button } from "@showz/ui/components/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ************************************************************************************************************************************
export const Route = createFileRoute("/admin/")({
	component: AdminPage,
});

// ROOT ************************************************************************************************************************************
function AdminPage() {
	const { data: title } = useSuspenseQuery(convexQuery(api.pages.admin, {}));

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
