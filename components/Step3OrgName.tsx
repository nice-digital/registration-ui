import { Field } from 'react-final-form'
import { PageHeader } from "@nice-digital/nds-page-header";

import { fetchData } from "../lib/helpers";
import { Registration } from "../lib/types";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context){

      const registrations = await fetchData('/api/getRegistrations', { Cookie: context.req.headers.cookie});

      return {
          props: { registrations: registrations}
      }
    }
});

export default function OrgName({registrations} : {registrations: Array<Registration>}) {

    const Error = ({ name } : { name: string }) => (
        <Field
          name={name}
          subscription={{ touched: true, error: true }}
          render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
          }
        />
    );

    const required = (value : any) => (value ? undefined : 'Required');

    

    return (
        <>

{registrations && Array.isArray(registrations) && registrations.map((registration: Registration) => {
<div>{registration.id}</div>
})}
        
            <PageHeader heading="Registration" lead="To help determine eligibility please confirm the following:" />          
            <div>
                <div><label>Registering as organisation representative</label></div>
                <Field
                    name="organisationName"
                    component="input"
                    type="text"
                    placeholder="Organisation name"
                    validate={required}
                />
                <div><Error name="organisationName" /></div>
            </div>
        </>
    );
}
