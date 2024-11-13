import TabButton from "./TabButton";

export default function Nav() {
	return (
		<div className="absolute bottom-0 right-[240px] hidden lg:flex space-x-4">
			<TabButton tabName="Home" route="/" />
			<TabButton tabName="Upload" route="/upload" />
			<TabButton tabName="Advanced Search" route="/data" />
			<TabButton tabName="Explore" route="/data" /> {/* Placeholder */}
			<TabButton tabName="Submit" route="/data" /> {/* Placeholder */}
			<TabButton tabName="Tourmaline" route="/tourmaline" />
			<TabButton tabName="API" route="/data" /> {/* Placeholder */}
			<TabButton tabName="About" route="/about" />
		</div>
	);
}
