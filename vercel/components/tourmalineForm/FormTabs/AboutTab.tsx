

export default function AboutTab(){
	return(
		<div>
			<h1 className="text-secondary text-4xl font-bold text-center p-1">About</h1>
			<div className="p-4 text-left">
				<h2 className="text-secondary text-xl font-semibold">What is this page?</h2>
				<p className="leading-relaxed mt-2">
					Streamline your Tourmaline workflow setup with this user-friendly form. It comes pre-filled with default values designed for test data, so please adjust the values to match your analysis requirements. This webpage replaces manually editing the config.yaml file of the Tourmaline workflow.
				</p>
				
				<h2 className="text-secondary text-xl font-semibold mt-4">Guidance on the Go</h2>
				<p className="leading-relaxed mt-2">
					Each field is equipped with an informative icon—hover over them for details about the parameter in question. These tooltips are your quick help guide, providing immediate clarification in your form completion.
				</p>
				
				<h2 className="text-secondary text-xl font-semibold mt-4">Learn More</h2>
				<p className="leading-relaxed mt-2">
					For more information on Tourmaline and its capabilities, click on the 'Tourmaline' title image above to be directed to the official GitHub and Wiki page.
				</p>
				
				<h2 className="text-secondary text-xl font-semibold mt-4">Get Started</h2>
				<p className="leading-relaxed mt-2">
					Ready to initiate your run? Click the Denoise tab on the left or use the arrows below. Hover over the info buttons for hints, and click Submit when finished.
				</p>
			</div>
		</div>
)}	
