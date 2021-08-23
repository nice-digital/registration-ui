import { useState, useEffect } from 'react'

import Layout from '../components/layout';

import { PageHeader } from "@nice-digital/nds-page-header";
import { Table } from "@nice-digital/nds-table";
import { Button } from "@nice-digital/nds-button";

import useApi from '../lib/use-api';

import { Registration } from "../lib/types";


export default function Registrations() {
    const [registrations, setRegistrations] = useState<Array<Registration>>([])

    const { response } : { response: Array<Registration> }  = useApi('/api/getRegistrations'); 

    useEffect(() => {
        setRegistrations(response);
      }, [response]);


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
                {registrations && registrations.map((registration: Registration) => (
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
            </Table>
        </Layout>
    );
}