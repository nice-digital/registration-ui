import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '../components/layout';

import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Button } from "@nice-digital/nds-button";

import { Registration } from "../lib/types";

import { fetchData } from "../lib/helpers";

  export const getServerSideProps = withPageAuthRequired({
      async getServerSideProps(context){
        return {
            props: { registrations: await fetchData('/api/getRegistrations', { Cookie: context.req.headers.cookie})}
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
                        <th>Date submitted</th>
                        <th>Topic / project</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {registrations && Array.isArray(registrations) && registrations.map((registration: Registration) => (
                        <tr key={registration.id}>
                            <td>{registration.dateSubmitted}</td>
                            <td>{registration.title}</td>
                            <td>{registration.status}</td>
                            <td>{registration.status === "Pending" ? (
                                <Button onClick={() => handleCancelClick(registration.id)}>Cancel request</Button>
                            ) : registration.status === "Rejected" ? (
                                <Button>Contact NICE about this request</Button>
                            ) : null}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
}