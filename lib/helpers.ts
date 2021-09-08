import { ProjectType } from "./types";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : process.env.SELF_URL;

export const backend_url = process.env.BACKEND_URL || "https://localhost";

export async function fetchData(url: string, headersForFetch: any, method: string = "GET", jsonDataToPost: string = "") {
    const headers = Object.assign({}, headersForFetch);
    const fetchUrl = url.startsWith("http") ? url : `${server}${url}`;


 console.log(`fetch data url: ${fetchUrl}`);
 console.log(`fetch data headers: ${JSON.stringify(headers)}`);
 console.log(`fetch data method: ${method}`);

    const res = await fetch(fetchUrl, { headers : headers, method: method });
    return await res.json();
}

export const projectPrefix = 'PROJECT-';

export function mungeFormValueData(data: any, guidance: Array<ProjectType>){

    //this munges this: {"PROJECT-GID-TA10480":true,"PROJECT-GID-TA10590":true,"PROJECT-PH25":false,"registeringAs":"organisation","organisationName":"fjdskl","addressLine1":"jkl","addressLine2":"jk","townOrCity":"jk","county":"jk","postcode":"jk","country":"Scotland"}

    //into this: {"organisationName":"gfd","addressLine1":"gfd","addressLine2":"gfd","townOrCity":"gfd","county":"Lancashiregfd","postcode":"gfd","country":"England","projects":[{"id":"GID-TA10480","title":"Lenalidomide with R-CHOP for untreated activated diffuse large B-cell lymphoma [ID1611]","programmeID":"Technology appraisal guidance"},{"id":"GID-TA10590","title":"Nivolumab for treating platinum-resistant advanced or recurrent ovarian cancer [ID2714]","programmeID":"Technology appraisal guidance"},{"id":"GID-TA10625","title":"Crizotinib for treating metastatic c-MET exon 14-positive non-small-cell lung cancer [ID1472]","programmeID":"Technology appraisal guidance"}]}
    
    let dataToReturn = Object.keys(data).filter(key => !key.startsWith(projectPrefix)).reduce((obj : any, key : any) => {obj[key] = data[key]; return obj;}, {});
    
    const projectIds = Object.keys(data).filter((key : any) => key.startsWith(projectPrefix) && data[key] === true).map(item => item.substring(8));;
    let projects = [];

    for (const projectId of projectIds){
        const projectInGuidance = guidance.find(g => g.Reference === projectId);
        if (typeof(projectInGuidance) !== "undefined"){ 
            projects.push({id: projectInGuidance.Reference, title: projectInGuidance.Title, programmeID: projectInGuidance.ProductTypeName});
        } else{
            console.log("guidance not found. this shouldn't happen.");
        }
    }
    dataToReturn.projects = projects;

    return dataToReturn;
}