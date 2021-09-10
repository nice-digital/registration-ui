import React from 'react';

import WizardContext from "../components/WizardContext";
import { mungeFormValueData } from "../lib/helpers";
import { ProjectType } from "../lib/types";

//export default function BuilderSelect({guidance, preselectedIds} : {guidance: Array<ProjectType>, preselectedIds: string | Array<string> | undefined}) {
export default function ReviewAndSubmit({guidance} : {guidance: Array<ProjectType>}) {

    let value = React.useContext(WizardContext);  



    //console.log("value from use context:" + JSON.stringify(value));

    value = mungeFormValueData(value, guidance);

    //console.log("munged value from use context:" + JSON.stringify(value));

    //sample munged value: {projects: ["GID-TA10480","GID-TA10590"],"registeringAs":"organisation","organisationName":"fjdskl","addressLine1":"jkl","addressLine2":"jk","townOrCity":"jk","county":"jk","postcode":"jk","country":"Scotland"}

    return (
        <>
            <h3>Review and submit page</h3>
            <p>todo: pretty up the data:</p>
            <pre>{JSON.stringify(value, null, "\t")}</pre>               
        </>
    )
}