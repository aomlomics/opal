"use client"

import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function UserNav() {
	const { isSignedIn, isLoaded, user } = useUser();
	return (
		<>
			{isSignedIn ? (
				<UserButton afterSignOutUrl="/"/>
			) : (
				<SignInButton></SignInButton>
			)}
		</>
	);
}