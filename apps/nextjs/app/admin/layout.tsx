import { Providers } from "./providers";

// ROOT ************************************************************************************************************************************
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
	return <Providers>{children}</Providers>;
}
