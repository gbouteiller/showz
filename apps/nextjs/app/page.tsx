import { api } from "@showz/convex/api";
import { Button } from "@showz/ui/components/button";
import { fetchQuery } from "convex/nextjs";

export default async function Page() {
	const hello = await fetchQuery(api.test.hello);

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">{hello}</h1>
				<Button size="sm">Button</Button>
			</div>
		</div>
	);
}
