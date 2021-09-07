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




export function mungeFormValueData(data: any){

    //this munges this: {"PROJECT-GID-TA10480":true,"PROJECT-GID-TA10590":true,"PROJECT-PH25":false,"registeringAs":"organisation","organisationName":"fjdskl","addressLine1":"jkl","addressLine2":"jk","townOrCity":"jk","county":"jk","postcode":"jk","country":"Scotland"}

    //into this: {projects: ["GID-TA10480","GID-TA10590"],"registeringAs":"organisation","organisationName":"fjdskl","addressLine1":"jkl","addressLine2":"jk","townOrCity":"jk","county":"jk","postcode":"jk","country":"Scotland"}
    

    let dataToReturn = Object.keys(data).filter(key => !key.startsWith('PROJECT-')).reduce((obj : any, key : any) => {obj[key] = data[key]; return obj;}, {});
    dataToReturn.projects = Object.keys(data).filter((key : any) => key.startsWith('PROJECT-') && data[key] === true).map(item => item.substring(8));;

    return dataToReturn;
}