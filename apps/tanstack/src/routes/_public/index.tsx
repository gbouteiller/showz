import { convexQuery } from "@convex-dev/react-query";
import { api } from "@showz/convex/api";
import { Button } from "@showz/ui/components/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/")({
	component: HomePage,
});

// ROOT ************************************************************************************************************************************
function HomePage() {
	const { data: title } = useSuspenseQuery(convexQuery(api.pages.home, {}));

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">{title}</h1>
				<Button asChild variant="link">
					<Link to="/admin">Go to Admin</Link>
				</Button>
			</div>
		</div>
	);
}
