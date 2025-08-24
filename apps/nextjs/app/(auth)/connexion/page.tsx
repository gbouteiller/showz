"use client";

import { api } from "@showz/convex/api";
import { Authenticated, AuthLoading, Unauthenticated, useQuery } from "convex/react";
import { authClient } from "@/lib/auth";
import { signIn } from "./actions";

export default function App() {
	return (
		<>
			<AuthLoading>
				<div>Loading...</div>
			</AuthLoading>
			<Unauthenticated>
				<SignIn />
			</Unauthenticated>
			<Authenticated>
				<Dashboard />
			</Authenticated>
		</>
	);
}

function Dashboard() {
	const user = useQuery(api.auth.getCurrentUser);
	return (
		<div>
			<div>Hello {user?.name}!</div>
			<button type="button" onClick={() => authClient.signOut()}>
				Sign out
			</button>
		</div>
	);
}

function SignIn() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		await signIn(formData.get("email") as string, formData.get("password") as string);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" name="email" placeholder="Email" />
			<input type="password" name="password" placeholder="Password" />
			<button type="submit">{"Sign in"}</button>
		</form>
	);
}
