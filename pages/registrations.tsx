import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from "next/link";
import moment, { defaultFormat } from "moment";


import Layout from '../components/layout';

import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";

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
    return (
        <Layout>
            <PageHeader heading="Registrations" />
            <h2 className="h3">My guidance projects</h2>
            <p className="mb--0">All guidance projects I registered for</p>
            <p className="text-right mv--0">
                <Link href="/builder">
                    <a className="btn btn--cta mh--0">Add new guidance project</a>
                </Link>
            </p>            
            <Table>
                <thead>
                    <tr>
                        <th>Date submitted &#x25be;</th>
                        <th>Topic / project</th>
                        <th>Registration status</th>
                        <th>Next phase</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations && Array.isArray(registrations) && registrations.map((registration: Registration) => {
                        const guidanceLink = `https://www.nice.org.uk/guidance/indevelopment/${registration.projectID}`;

                        
                        const dateSubmitted = moment(registration.dateSubmitted, moment.defaultFormat = "DD/MM/YYYY HH:mm").format("D MMMM, YYYY");

                        return (
                            <tr key={registration.id}>
                                <td>{dateSubmitted}</td>
                                <td><a target="_blank" rel="noreferrer" href={guidanceLink}>{registration.title}</a></td>
                                <td>{registration.status}</td>
                                <td>{registration.nextPhase}</td>
                                <td>
                                    <a target="_blank" rel="noreferrer" href={guidanceLink}>Cancel registration</a> | <a target="_blank" rel="noreferrer" href={guidanceLink}>Contact NICE</a>
                                </td>
                                {/* <td>{registration.projectID}</td> */}
                                {/* <td>{registration.productTypeName}</td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Layout>
    );
}