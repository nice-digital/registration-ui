import { Field } from "react-final-form";

import { PageHeader } from "@nice-digital/nds-page-header";

export default function IndLocation() {

    const Error = ({ name } : { name: string }) => (
        <Field
          name={name}
          subscription={{ touched: true, error: true }}
          render={({ meta: { touched, error } }) =>
            touched && error ? <p className="input__error">{error}</p> : null
          }
        />
    );

    const required = (value : any) => (value ? undefined : 'Required');

    return (
        <>
			<PageHeader heading="Country / Location" />
			<div className="input">
          		<label className="input__label" htmlFor="indLocation">Country</label>
          		<Error name="indLocation" />
				<Field name="indLocation" component="select" validate={required}>
					<option value="">Please select</option>
					<option value="england">England</option>
					<option value="scotland">Scotland</option>
					<option value="wales">Wales</option>
					<option value="euother">Other European country</option>
					<option value="unitedstates">United States</option>
				</Field>
    		</div>
		</>
    );
}
