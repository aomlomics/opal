"use client";

import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function User() {
	return (
		<>
			<SignedIn>
				<UserButton
					appearance={{
						elements: {
							cardBox: "bg-base-100 shadow-md",
							headerTitle: "text-primary", // this doesnt do anything
							headerSubtitle: "text-primary", // this one doesnt do anything
							headerBackground: "bg-primary",
							button: "text-primary hover:bg-primary",
							buttonText: "text-primary",
							divider: "bg-base-300",
							
							userButtonPopoverActionButtonIcon: "text-primary",
							userButtonPopoverActionButtonLabel: "text-primary",
							
							// for the email name
							userPreviewSecondaryIdentifier: "text-primary",
							// for the name
							userPreviewMainIdentifier: "text-primary",
							
							socialButtonsBlockButton: "bg-base-200 text-primary hover:bg-primary",
							formButtonPrimary: "text-primary hover:bg-primary/80",
							formFieldInput: "bg-base-100 text-primary",
							
							avatarBox: "border-primary",
							
							footer: "hidden",
							userButtonPopoverFooter: "hidden"
						}
					}}
				>
					<UserButton.MenuItems>
						<UserButton.Link href="/mySubmissions" label="My Submissions" labelIcon={<span>.</span>} />
					</UserButton.MenuItems>
				</UserButton>
			</SignedIn>
			<SignedOut>
				<SignInButton>
					<button className="btn bg-primary text-base-content hover:bg-primary/80">Sign In</button>
				</SignInButton>
			</SignedOut>
		</>
	);
}
