import { Field } from 'react-final-form'

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
        </>
    );
}
