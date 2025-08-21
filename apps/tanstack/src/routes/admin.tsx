import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { fetchClerkAuth } from "@/lib/auth";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ context: { convexQueryClient }, location: { href } }) => {
		const { token, userId } = await fetchClerkAuth();
		if (!userId) throw redirect({ to: "/sign-in/$", params: { _splat: `?redirect_url=${href}` } });
		if (token) convexQueryClient.serverHttpClient?.setAuth(token);
	},
	component: AdminLayout,
});

// ROOT ************************************************************************************************************************************
function AdminLayout() {
	const { convexClient } = Route.useRouteContext();

	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
				<Outlet />
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
