"use client";

import { Button } from "@showz/ui/components/button";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth";

// ROOT ************************************************************************************************************************************
export function SignOutButton() {
	return (
		<Button
			variant="link"
			className="cursor-pointer"
			onClick={() => authClient.signOut({ fetchOptions: { onSuccess: () => redirect("/") } })}
		>
			Sign out
		</Button>
	);
}
