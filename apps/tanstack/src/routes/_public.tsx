import { createFileRoute, Outlet } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

// ROOT ************************************************************************************************************************************
function PublicLayout() {
	return <Outlet />;
}
