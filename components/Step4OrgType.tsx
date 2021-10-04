import { Field } from 'react-final-form';
import { PageHeader } from "@nice-digital/nds-page-header";

export default function OrgType() {

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
            <PageHeader heading="Registration" lead="To help determine eligibility please confirm the following:" />
        
            <div><label>Type of organisation</label></div>
            <Field name="organisationType" component="select" validate={required}>
            <option value=""></option>
                <option value="Government">Government departments and national statutory agencies</option>
                <option value="Healthwatch">Local Healthwatch organisations</option>
                <option value="Manufacturers">Manufacturers and commercial industries</option>
                <option value="Public">National organisations for people using services, carers and the public</option>
                <option value="Practitioners">National organisations representing practitioners</option>
                <option value="Research">Organisations that fund or carry out research</option>
                <option value="Overseas">Overseas agencies with a remit covering England</option>
                <option value="Independent">Private, vouluntary sectory, not-for-profit providers and other independent providers</option>
            </Field>
            <div><Error name="organisationType" /></div>
        </>
    );
}
