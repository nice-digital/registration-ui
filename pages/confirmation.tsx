import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import moment from "moment";
import { useRouter } from 'next/router';

import { ProjectType } from "../lib/types";
import { fetchData } from "../lib/helpers";
import { Guideline } from "../components/Step1ProjectSelect";

import { PageHeader } from "@nice-digital/nds-page-header";
import Layout from "../components/layout";


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        return {
            props: { guidance: await fetchData('/api/getGuidance', { Cookie: context.req.headers.cookie})}
        }
    }
});

export default function Confirmation({ guidance }: {guidance: Array<ProjectType>}) {
    const router = useRouter();
    const { select } = router.query;

    let selectedProjects= [] as Array<ProjectType> ;

    if (select) {
        const foundProjects = guidance.filter(elem => select.includes(elem.Reference));

        if (typeof(foundProjects) !== "undefined"){
            selectedProjects = foundProjects;
        }
    }

    return (
        <Layout>
            <PageHeader heading="Registration complete" />
            <h2 className="h3">You submitted your registration on {moment().format("D MMMM YYYY")}.</h2>
            {selectedProjects.map(project => (
                <Guideline data={project} hideCheckboxes={true} key={project.Reference} />                
            ))}
            <hr />
            <h2 className="h3">What happens next?</h2>
            <p>We will now review your registration request, you can view your registration status, list of chosen topics and other details on your My registrations page.</p>
            <Link href="/registrations">
                <a className="btn btn--cta mh--0">View My registrations</a>
            </Link>
        </Layout>
    );
}