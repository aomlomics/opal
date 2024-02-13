import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/Map'), {
	ssr: false,
})

export default function Dashboard() {
	return (
		<div className="w-full grow-1">
			<Map></Map>
		</div>
	);
}