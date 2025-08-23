import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
	integrations: [clerk({ clerkJSVariant: "headless" }), react()],
	output: "server",
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
	},
	env: {
		schema: {
			CLERK_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
			PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({ context: "client", access: "public" }),
			PUBLIC_CONVEX_URL: envField.string({ context: "client", access: "public" }),
		},
	},
});
