import { navigate } from "astro:transitions/client";
import { Button } from "@showz/ui/components/button";
import { authClient } from "@/lib/auth";
import { withConvex } from "@/lib/convex";

export const SignOutButton = withConvex(() => {
	return (
		<Button
			variant="link"
			className="cursor-pointer"
			onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => navigate("/") } })}
		>
			Sign out
		</Button>
	);
});
