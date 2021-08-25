import { Header, Footer, IdamProviderProps } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

export default function Layout({ children, loggedOut }: any) {
	const auth: IdamProviderProps = {
		links: [
			{ text: "My registrations", url: "/registrations" },
			{ text: "Sign out", url: "/api/auth/logout" },
		],
		displayName: "John",
		provider: "idam",
	};

	if (loggedOut) {
		auth.links = [{ text: "Sign in", url: "/api/auth/login" }];
		auth.displayName = "";
	}

	return (
		<>
			<Header search={false} auth={auth} />    
			<Container>
				{children}
			</Container>
			<Footer />
		</>
	);
}