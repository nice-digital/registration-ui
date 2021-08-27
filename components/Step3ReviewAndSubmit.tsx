import { useForm } from 'react-final-form'

export default function ReviewAndSubmit() {
    const form = useForm();

    console.log(JSON.stringify(form));

    //todo: pull the values from the Wizard then construct the page from them.

    return (
        <>
            <h3>Review page goes here</h3>

            <p></p>
        </>
    )
}