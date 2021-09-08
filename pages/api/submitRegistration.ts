import { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import { fetchData, backend_url } from "../../lib/helpers";

export default withApiAuthRequired(async function submitRegistration(req: NextApiRequest, res: NextApiResponse) {

    console.log("inside submit registration");

    const tokenResponse = await getAccessToken(req, res);

    console.log(`submit registrations, access token: ${tokenResponse.accessToken}`);

    console.log(`submit registrations, body: ${JSON.stringify(req.body)}`);
    
    const json = req.body; //JSON.stringify({ "Body": req.body, "Headers": { "Authorization": `Bearer ${tokenResponse.accessToken}` }});

    console.log(`submit registrations, json: ${json}`);

    const response = await fetchData(backend_url, {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, 'POST', json);

    console.log("submit response:" + JSON.stringify(response));

    res.status(200).json(response);
});