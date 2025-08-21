import { ClerkProvider, SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/sign-in/$")({
	component: SignInPage,
});

// ROOT ************************************************************************************************************************************
function SignInPage() {
	return (
		<ClerkProvider>
			<div className="flex items-center justify-center min-h-screen">
				<SignIn />
			</div>
		</ClerkProvider>
	);
}
