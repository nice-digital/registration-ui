import { Field } from 'react-final-form'

export default function UserDetails() {

    const Error = ({ name } : { name: string }) => (
        <Field
          name={name}
          subscription={{ touched: true, error: true }}
          render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
          }
        />
      )

    const required = (value : any) => (value ? undefined : 'Required')

    return (
        <>
            <h3>To help determine eligibility please confirm the following:</h3>            
            <div>
                <label>
                    <Field
                        name="registeringAs"
                        component="input"
                        type="radio"
                        value="organisation"
                    />{' '}
                    Registering as organisation representative
                </label>
            </div>
            <div>
                <label>
                    <Field
                        name="registeringAs"
                        component="input"
                        type="radio"
                        value="individual"
                    />{' '}
                    Registering as individual
                </label>
            </div>
            <div>
                <label>Organisation Name</label>
                <Field
                    name="organisationName"
                    component="input"
                    type="text"
                    placeholder="Organisation name"
                />
                {/* <Error name="organisationName" /> */}
            </div>
            <div>
                <label>Building and street</label>
                <Field
                    name="addressLine1"
                    component="input"
                    type="text"
                    validate={required}
                />
                <Error name="addressLine1" />
            </div>
            <div>
                <Field
                    name="addressLine2"
                    component="input"
                    type="text"
                />
                {/* <Error name="addressLine2" /> */}
            </div>
            <div>
                <label>Town or city</label>
                <Field
                    name="townOrCity"
                    component="input"
                    type="text"
                />
                {/* <Error name="townOrCity" /> */}
            </div>
            <div>
                <label>County</label>
                <Field
                    name="county"
                    component="input"
                    type="text"
                />
                {/* <Error name="county" /> */}
            </div>
            <div>
                <label>Country</label>
                <Field name="country" component="select">
                    <option value="England">England</option>
                    <option value="England">Scotland</option>
                    <option value="England">Wales</option>
                    <option value="England">Northern Ireland</option>
                    {/* TODO: add the proper list here. */}
                </Field>
                {/* <Error name="country" /> */}
            </div>
            {/* TODO: the other fields */}
        </>
    );
}
