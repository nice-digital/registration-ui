import Layout from '../components/layout';

import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Button } from "@nice-digital/nds-button";

import registrations from "../lib/registrations.json";
// import useApi from '../lib/use-api';

export default function Registrations() {

    const handleCancelClick = (id: number) => {
        console.log(id);
    };

    return (
        <Layout>
            <PageHeader heading="My registrations" />
            <Table>
                <tr>
                    <th>Date submitted</th>
                    <th>Topic / project</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                {registrations.map((registration: any) => (
                    <tr>
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
            </Table>
        </Layout>
    );
}