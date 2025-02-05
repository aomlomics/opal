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

							button: "text-primary hover:bg-base-200",

							// Menu items - text base-content, icons primary, hover effects
							userButtonPopoverActionButton: "hover:text-primary",
							userButtonPopoverActionButtonIcon: "text-primary",
							userButtonPopoverActionButtonLabel: "text-primary",
							menuItem: "text-primary hover:text-primary/80",
							actionButtonIcon: "text-primary",
							userButtonPopoverActionButtonText: "text-primary hover:text-primary/80",
							userButtonPopoverActionButton__link: "text-primary hover:text-primary/80",

							// Add these specific selectors for custom menu links
							userButtonPopoverActionButton__custom: "text-primary hover:text-primary/80",
							userButtonPopoverActionButtonText__custom: "text-primary hover:text-primary/80",

							// Email and name
							userPreviewSecondaryIdentifier: "text-primary",
							userPreviewMainIdentifier: "text-primary",

							socialButtonsBlockButton: "text-primary hover:bg-primary",
							formButtonPrimary: "text-primary hover:bg-primary/80",
							formFieldInput: "text-primary",

							avatarBox: "border-primary",

							footer: "hidden",
							userButtonPopoverFooter: "hidden",

							// Target the custom menu item button specifically
							userButtonPopoverCustomItemButton: "text-primary hover:text-primary"
						}
					}}
				>
					<UserButton.MenuItems>
						<UserButton.Link
							href="/mySubmissions"
							label="My Submissions"
							labelIcon={
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path strokeWidth="2" d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
									<path strokeWidth="1.5" d="M8 12h8M8 16h8" />
								</svg>
							}
						/>
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
