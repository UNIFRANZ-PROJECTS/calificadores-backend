const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2( process.env.IDCLIENT, process.env.SECRETCLIENT );

OAuth2_client.setCredentials({ refresh_token: process.env.REFRESHTOKEN });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    options: {
      debug: true
    },
    auth: {
        type: 'OAuth2',
        user: process.env.USERGMAIL,
        clientId: process.env.IDCLIENT,
        clientSecret: process.env.SECRETCLIENT,
        refreshToken: process.env.REFRESHTOKEN,
        accessToken: OAuth2_client.getAccessToken(),
    }
  });
      
transporter.verify()
.then( ()=>{
	console.log('Ready for send email');
})
.catch( (err)=>{
	console.log(`err ${err}`);
})

module.exports = {
    transporter
}