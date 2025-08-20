import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

// ROOT ************************************************************************************************************************************
export default function AdminLayout({ children }: AdminLayoutProps) {
	return <Providers>{children}</Providers>;
}
type AdminLayoutProps = PropsWithChildren;
