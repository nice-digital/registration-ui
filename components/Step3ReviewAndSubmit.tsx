import React from 'react';

import WizardContext from "../components/WizardContext";
import { mungeFormValueData } from "../lib/helpers";

export default function ReviewAndSubmit() {

    let value = React.useContext(WizardContext);  



    console.log("value from use context:" + JSON.stringify(value));

    value = mungeFormValueData(value);

    console.log("munged value from use context:" + JSON.stringify(value));

    //sample value: {"GID-TA10480":true,"GID-TA10590":true,"registeringAs":"organisation","organisationName":"fjdskl","addressLine1":"jkl","addressLine2":"jk","townOrCity":"jk","county":"jk","postcode":"jk","country":"Scotland"}

    return (
        <>
            <h3>Review page values:</h3>
            <pre>{JSON.stringify(value)}</pre>                 
        </>
    )
}