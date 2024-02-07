"use client"

import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function UserNav() {
	const { isSignedIn, isLoaded, user } = useUser();
	return (
		<div className="m-3">
			{isSignedIn ? (
				<UserButton afterSignOutUrl="/"/>
			) : (
				<SignInButton>
					<button className="btn">Sign In</button>
				</SignInButton>
			)}
		</div>
	);
}