import { PUBLIC_CONVEX_URL } from "astro:env/client";
import { useAuth } from "@clerk/astro/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { JSX } from "react";

const client = new ConvexReactClient(PUBLIC_CONVEX_URL);

export function withConvex<Props extends JSX.IntrinsicAttributes>(Component: React.ComponentType<Props>) {
	return function WithConvexProvider(props: Props) {
		return (
			<ConvexProviderWithClerk client={client} useAuth={useAuth}>
				<Component {...props} />
			</ConvexProviderWithClerk>
		);
	};
}
