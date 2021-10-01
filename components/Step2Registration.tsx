import { Field } from "react-final-form";

import { PageHeader } from "@nice-digital/nds-page-header";

export default function Registration() {

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
            <PageHeader heading="Registration" />
            <h2 className="h3">To help determine eligibility please confirm the following:</h2>
            <div className="input">
                <label className="input__label" htmlFor="registeringAs"></label>
                <Error name="registeringAs" />				
                <div className="radio">
                    <Field
                        name="registeringAs"
                        component="input"
                        type="radio"
                        value="organisation"
                        className="radio__input"
                        id="registeringAsOrganisation"
                        validate={required}
                    />
                    <label className="radio__label" htmlFor="registeringAsOrganisation">
                        Registering as organisation representative
                    </label>
                </div>

                <div className="radio">
                    <Field
                        name="registeringAs"
                        component="input"
                        type="radio"
                        value="individual"
                        className="radio__input"
                        id="registeringAsIndividual"
                        validate={required}
                    />
                    <label className="radio__label" htmlFor="registeringAsIndividual">
                        Registering as individual
                    </label>
                </div>				
            </div>
        </>
    );
}
