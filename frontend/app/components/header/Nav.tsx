import TabButton from "./TabButton";

export default function Nav() {
	return (
		<div className="absolute bottom-0 right-[240px] hidden lg:flex space-x-4">
			<TabButton tabName="Home" route="/" />
			<TabButton tabName="Advanced Search" route="/data" />
			<TabButton tabName="Explore" route="/explore" />
			<TabButton tabName="Submit" route="/submit" />
			<TabButton tabName="Assays" route="/assays" />
			<TabButton tabName="Tourmaline" route="/tourmaline" />
			<TabButton tabName="API" route="/api" />
			<TabButton tabName="Help" route="/help" />
		</div>
	);
}
