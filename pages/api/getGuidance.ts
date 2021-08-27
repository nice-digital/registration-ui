import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

import stakeholderRegList from "../../lib/stakeholder-registration-list.json";

//import guidance from "../../lib/guidance.json";

export default withApiAuthRequired(async function getGuidance(req, res) {

    console.log("inside guidance");

    //const tokenResponse = await getAccessToken(req, res);

    //console.log(`get guidance, access token: ${tokenResponse.accessToken}`);


    const guidance = stakeholderRegList._embedded["nice.indev:stakeholder-registration"];

    //todo: call the real api here with the access token

    res.status(200).json(guidance);
});