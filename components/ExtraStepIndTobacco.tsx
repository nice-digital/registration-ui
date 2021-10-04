import { Field } from "react-final-form";

import { PageHeader } from "@nice-digital/nds-page-header";

export default function ExtraStepIndTobacco() {

    const Error = ({ name } : { name: string }) => (
        <Field
        	name={name} 
        	subscription={{ touched: true, error: true }} 
        	render={({ meta: { touched, error } }) =>
            	touched && error ? <p className="input__error">{error}</p> : null
          	}
        />
    );

    const required = (value : any) => (value ? undefined : "Required");

    return (
        <>
			<PageHeader heading="Do you have any links with the tobacco industry?" />
			<div className="input">
				<label className="input__label" htmlFor="tobaccoOne">Are you part of the tobacco industry?</label>
				<Error name="tobaccoOne" />				
				<div className="radio radio--inline">
					<Field
						name="tobaccoOne"
						component="input"
						type="radio"
						value="yes"
						className="radio__input"
						id="tobaccoOneYes"
						validate={required}
					/>
					<label className="radio__label" htmlFor="tobaccoOneYes">
						Yes
					</label>
				</div>

				<div className="radio radio--inline">
					<Field
						name="tobaccoOne"
						component="input"
						type="radio"
						value="no"
						className="radio__input"
						id="tobaccoOneNo"
						validate={required}
					/>
					<label className="radio__label" htmlFor="tobaccoOneNo">
						No
					</label>
				</div>				
			</div>
        </>
    );
}
