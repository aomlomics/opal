import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function LoginButton() {
	return (
		<div className="mr-5">
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton>
					<button className="btn bg-primary text-white hover:bg-primary/80">Sign In</button>
				</SignInButton>
			</SignedOut>
		</div>
	);
}
