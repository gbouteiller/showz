import { api } from "@showz/convex/api";
import { Button } from "@showz/ui/components/button";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

// ROOT ************************************************************************************************************************************
export default async function Page() {
	const title = await fetchQuery(api.pages.home);

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">{title}</h1>
				<Button asChild variant="link">
					<Link href="/admin">Go to Admin</Link>
				</Button>
			</div>
		</div>
	);
}
