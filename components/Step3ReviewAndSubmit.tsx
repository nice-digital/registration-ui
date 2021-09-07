import React from 'react';

import WizardContext from "../components/WizardContext";

export default function ReviewAndSubmit() {

    const value = React.useContext(WizardContext);  
    console.log("value from use context:" + JSON.stringify(value));

    return (
        <>
            <h3>Review page values:</h3>
            <pre>{JSON.stringify(value)}</pre>                 
        </>
    )
}