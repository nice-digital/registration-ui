import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from "next/link";

import Layout from '../components/layout';

import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Button } from "@nice-digital/nds-button";

import { Registration } from "../lib/types";

import { fetchData } from "../lib/helpers";

  export const getServerSideProps = withPageAuthRequired({
      async getServerSideProps(context){

        const registrations = await fetchData('/api/getRegistrations', { Cookie: context.req.headers.cookie});

        for (const registration of registrations){ //TODO: this hits indev once per project. that's way too much. we need a single endpoint created for the real site.

            const project = await fetchData(`${process.env.INDEV_URL}${registration.projectID}`, {Accept: 'application/json' });

            const timelineList = project._embedded["nice.indev:timeline-list"];
            if (typeof(timelineList) !== "undefined"){
                const timeline = timelineList._embedded["nice.indev:timeline"]
                if (typeof(timeline) !== "undefined"){
                    const latestTimelineItem = timeline[0];
                    if (typeof(latestTimelineItem) !== "undefined"){
                        registration.nextPhase = `${latestTimelineItem.Column2} ${latestTimelineItem.Column1}`;
                    }
                }                
            }
        }

        return {
            props: { registrations: registrations}
        }
      }
  });

export default function Registrations({registrations} : {registrations: Array<Registration>}) {

    const handleCancelClick = (id: number) => {
        console.log(id);
    };

    return (
        <Layout>
            <PageHeader heading="My registrations" />
            <Table>
                <thead>
                    <tr>
                        <th>Date submitted &#x25be;</th>
                        <th>Id</th>
                        <th>Topic / project</th>
                        <th>Programme</th>
                        <th>Status</th>
                        <th>Next phase</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {registrations && Array.isArray(registrations) && registrations.map((registration: Registration) => (
                        <tr key={registration.id}>
                            <td>{registration.dateSubmitted}</td>
                            <td>{registration.projectID}</td>
                            <td><a target="_blank" rel="noreferrer" href={`https://www.nice.org.uk/guidance/indevelopment/${registration.projectID}`}>{registration.title}</a></td>
                            <td>{registration.productTypeName}</td>
                            <td>{registration.status}</td>
                            <td>{registration.nextPhase}</td>
                            <td>{registration.status === "Pending" ? (
                                <Button onClick={() => handleCancelClick(registration.id)}>Cancel request</Button>
                            ) : registration.status === "Rejected" ? (
                                <Button>Contact NICE about this request</Button>
                            ) : null}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link href="/builder">
                <button className="btn btn--cta">New registration</button>
            </Link>
        </Layout>
    );
}