import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import { fetchData, backend_url } from "../../lib/helpers";

export default withApiAuthRequired(async function getRegistrations(req, res) {

    console.log("inside registrations");

    const tokenResponse = await getAccessToken(req, res);

    console.log(`get registrations, access token: ${tokenResponse.accessToken}`);

    const registrations = await  fetchData(backend_url, {
        authorization: `Bearer ${tokenResponse.accessToken}`
      });

    res.status(200).json(registrations);
});