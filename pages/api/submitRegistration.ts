import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import { fetchData, backend_url } from "../../lib/helpers";

export default withApiAuthRequired(async function submitRegistration(req, res) {

    console.log("inside submit registration");

    const tokenResponse = await getAccessToken(req, res);

    console.log(`submit registrations, access token: ${tokenResponse.accessToken}`);

    //todo: get the json to POST.
    const json = JSON.stringify({todo: true});

    const registrations = await fetchData(backend_url, {
        authorization: `Bearer ${tokenResponse.accessToken}`
      }, 'POST', json);

    res.status(200).json(registrations);
});