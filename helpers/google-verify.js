const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerify = async(token) => {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_ID,  // Specify the process.env.GOOGLE_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[process.env.GOOGLE_ID_1, process.env.GOOGLE_ID_2, process.env.GOOGLE_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

  const {name, email, picture} = payload

  return {name, email, picture};

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
// verify().catch(console.error);
module.exports = {
  googleVerify
}
