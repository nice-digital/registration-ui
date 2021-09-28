import { Field } from 'react-final-form'

export default function IndRole() {

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
        <p>IndRole</p>
    );
}
