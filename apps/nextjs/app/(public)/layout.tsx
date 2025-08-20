import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

// ROOT ************************************************************************************************************************************
export default function PublicLayout({ children }: PublicLayoutProps) {
	return <Providers>{children}</Providers>;
}
type PublicLayoutProps = PropsWithChildren;
