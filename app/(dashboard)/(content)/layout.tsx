import { ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
	return <div className="mx-[300px] mt-4">{children}</div>;
}
