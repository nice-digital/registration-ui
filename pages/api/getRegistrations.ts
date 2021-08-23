import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import registrations from "../../lib/registrations.json";

export default withApiAuthRequired(async function getRegistrations(req, res) {

    console.log("inside registrations");

    const tokenResponse = await getAccessToken(req, res);

    console.log(`get registrations, access token: ${tokenResponse.accessToken}`);

    //todo: call the real api here with the access token

    res.status(200).json(registrations);
});