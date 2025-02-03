"use client";

import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function User() {
	return (
		<>
			<SignedIn>
				<UserButton>
					<UserButton.MenuItems>
						<UserButton.Link href="/mySubmissions" label="My Submissions" labelIcon={<span>.</span>} />
					</UserButton.MenuItems>
				</UserButton>
			</SignedIn>
			<SignedOut>
				<SignInButton>
					<button className="btn bg-primary text-white hover:bg-primary/80">Sign In</button>
				</SignInButton>
			</SignedOut>
		</>
	);
}
