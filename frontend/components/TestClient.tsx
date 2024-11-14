"use client";

//import { fetcher, getBaseUrl } from "@/helpers/utils";
import { fetcher } from "@/helpers/utils";
import useSWR from "swr";

export default function TestClient() {
	const projectsResponse = useSWR("/api/projects", fetcher);
	if (projectsResponse.isLoading) return <div>Loading...</div>;
	if (projectsResponse.error) return <div>Error</div>;
	const projects = projectsResponse.data;

	return <p>Response from API: {JSON.stringify(projects)}</p>;
}
