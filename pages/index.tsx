import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { PageHeader } from "@nice-digital/nds-page-header";

import Layout from "../components/layout";

export default function Home() {
	let { user, error, isLoading } = useUser();

	if (error) return <p>Broken</p>
	if (isLoading) return <p>Loading</p>

	return (
		<Layout loggedOut={user ? false : true}>
			<PageHeader heading="Home" />
			{user ? (
				<>
					<Link href="/registrations">Registrations</Link><br />
					<Link href="/profile">View profile</Link><br />
					<Link href="/api/auth/logout">Logout</Link>
				</>
			) : (
				<>
					<Link href="/builder">Register as a stakeholder</Link><br />
					<Link href="/api/auth/login">Login</Link>
				</>
			)}
		</Layout>
	);
}
