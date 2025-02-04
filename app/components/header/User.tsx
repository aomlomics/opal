"use client";

import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export default function User() {
	return (
		<>
			<SignedIn>
				<UserButton
					appearance={{
						elements: {
							// Dropdown background
							userButtonPopoverCard__userButton: "bg-base-100",
							userButtonPopoverContainer: "bg-base-100",
							userButtonPopoverActions: "bg-base-100",
							userButtonPopoverMain: "bg-base-100",
							
							headerTitle: "text-base-content",
							headerSubtitle: "text-base-content",
							button: "text-primary hover:bg-base-200",
							buttonText: "text-base-content",
							divider: "bg-base-300",
							
							// Menu items - text base-content, icons primary, hover effects
							userButtonPopoverActionButton: "hover:bg-base-200",
							userButtonPopoverActionButtonIcon: "text-primary",
							userButtonPopoverActionButtonLabel: "text-primary",
							menuItem: "text-base-content",
							menuItemText: "text-base-content",
							actionButtonIcon: "text-primary",
							
							// Email and name
							userPreviewSecondaryIdentifier: "text-primary",
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
