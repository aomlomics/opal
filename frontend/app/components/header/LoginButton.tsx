import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function LoginButton() {
	return (
		<div className="mr-5">
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton>
					<button className="btn bg-primary hover:bg-primary/80 text-white">Sign In</button>
				</SignInButton>
			</SignedOut>
		</div>
	);
}
