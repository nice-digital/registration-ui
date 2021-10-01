import { Field } from "react-final-form";

import { PageHeader } from "@nice-digital/nds-page-header";

export default function IndRole() {

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
			<PageHeader heading="Please specify your role" />
			<div className="input">
                <label className="input__label" htmlFor="indRole">Role</label>
				<Error name="indRole" />				
                <Field name="indRole" component="select" validate={required}>
					<option value="">Please select</option>
					<option value="public">Public</option>
					<option value="patient">Patient</option>
					<option value="clinical">Clinical</option>
					<option value="ipnotifier">Notifier of IP</option>
					<option value="specialistadvisor">Specialist advisor</option>
					<option value="specialistsociety">Specialist society</option>
				</Field>
			</div>
		</>
    );
}
