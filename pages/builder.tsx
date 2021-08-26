import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { Button } from "@nice-digital/nds-button";
// import { Input } from "@nice-digital/nds-input";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { fetchData } from "../lib/helpers";
import Layout from "../components/layout";
import { GuidelineType } from "../lib/types";

import BuilderSelect from "../components/builderSelect";

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        return {
            props: { guidance: await fetchData(context, '/api/getGuidance')}
        }
    }
});

export default function Builder({guidance} : {guidance: Array<GuidelineType>}) {

    return (
        <Layout>
            <BuilderSelect guidance={guidance} />
        </Layout>
    );
};