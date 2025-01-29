"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-base-100">
			<SignIn
				appearance={{
					elements: {
						formButtonPrimary: "bg-primary text-base-content hover:bg-primary/80",
						card: "bg-base-200 shadow-lg p-8",
						headerTitle: "text-primary text-3xl font-semibold",
						headerSubtitle: "text-primary font-normal",
						socialButtonsBlockButton: "bg-base-300 text-base-content hover:bg-base-400",
						formFieldInput: "bg-base-100 text-base-content",
						logoImage: {
							width: "1000px",
							height: "40px"
						}
					}
				}}
				path="/sign-in"
				routing="path"
				signUpUrl="/sign-up"
			/>
		</div>
	);
}
