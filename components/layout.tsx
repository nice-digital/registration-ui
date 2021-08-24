import { Header, Footer, IdamProviderProps } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

export default function Layout({ children }: any) {
    const auth: IdamProviderProps = {
		links: [
			{ text: "My registrations", url: "/registrations" },
			{ text: "Sign out", url: "/api/auth/logout" },
		],
		displayName: "John",
		provider: "idam",
	};

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