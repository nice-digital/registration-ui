import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function services(req, res) {
  try {

    console.log("inside withapi thing");

    var tokenResponse = await getAccessToken(req, res);

    console.log(tokenResponse.accessToken);

    const response = await fetch('https://si1bxg1832.execute-api.eu-west-1.amazonaws.com/userprofile', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${tokenResponse.accessToken}`
      }
    });


    const profileDetails = await response.json();
    res.status(response.status || 200).json(profileDetails);

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
