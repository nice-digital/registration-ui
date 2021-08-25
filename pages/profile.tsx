import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Button } from "@nice-digital/nds-button";
import { Input } from "@nice-digital/nds-input";

import { fetchData } from "../lib/helpers";
import Layout from "../components/layout";
import { UserProfile } from "../lib/types";

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        return {
            props: { profile: await fetchData(context, '/api/userprofile')}
        }
    }
});

export default function Profile({ profile }: { profile: UserProfile } ) {
    return (
        <Layout>
            <PageHeader heading="Profile page" />
            <Input label="First name" name="firstname" defaultValue={profile.firstName} />
            <Input label="Last name" name="lastname" defaultValue={profile.lastName} />
            <Input label="Email address" name="emailaddress" defaultValue={profile.emailAddress} />
            <Button>Update</Button>
        </Layout>
    );
}