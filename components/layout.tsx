import { Header, Footer, IdamProviderProps } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";

export default function Layout({ children }: any) {
    const auth: IdamProviderProps = {
		links: [
			{ text: "Health checks", url: "/healthchecks-ui" },
			{ text: "Sign out", url: "/Account/Logout" },
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