"use client"

import { clientApiFetch as clientApiFetch } from "@/helpers/utils";
import useSWR from "swr";

export default function TestClient() {
	const projectsResponse = clientApiFetch(useSWR, "projects");
	if (projectsResponse.isLoading) return <div>Loading...</div>;
  	if (projectsResponse.error) return <div>Error</div>;
	const projects = projectsResponse.data;

	return (
		<p>
			Response from API: {JSON.stringify(projects)}
		</p>
	);
}