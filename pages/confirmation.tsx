import Link from "next/link";

import { PageHeader } from "@nice-digital/nds-page-header";
import Layout from "../components/layout";


export default function Confirmation() {
    return (
        <Layout>
            <PageHeader heading="Confirmation page" />
            <br/><br/>
            <p>You have submitted. We&apos;ll let you know.</p>
            <br/><br/>
            <p>TODO: real content.</p>
            <br/><br/>
            <Link href="/registrations">Go to your registrations list page</Link>
        </Layout>
    );
}