const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey =process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
    email: process.env.ASIM_SHAH_EMAIL,
    name: process.env.BUYSELLBIZ,
  };

async function switchedToTheBroker(receiver, userName) {
  const receivers = [
    {
      email: receiver,
    },
  ];
  return await  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Welcome to the team of Experts    .',
      textContent: `
      Welcome to the Team of Exerts ;)  .
        `,
      htmlContent: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BuySellBiz</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: #f4f4f4;
          }
      
          header {
            background-color: #fcfcfc;
            color: #000;
            padding: 1rem;
            border-bottom:1px solid #e1e1e1;
            text-align: start;
          }
      
          header h1 {
            margin: 0;
          }
      
        
         
      
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
      
          .card {
            background-color: #fff;
            border : 2px solid #e1e1e1;
            box-shadow: 0 0 10px rgba(0, 0, 0, 1);
            padding: 2rem;
            border-radius: 8px;
            width: 60%;
            margin:1rem auto;
          }
      
          footer {
            background-color: #fcfcfc;
            border-top:1px solid #e1e1e1;
            color: #000;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 99%;
          }
        </style>
      </head>
      <body>
      
        <header>
          <h1>BuySellBiz</h1>
        </header>
      

      
        <div class="container">
          <div class="card">
            <h2>Hi, Expert</h2>
            <p>Welcome   ${userName} !, You have successfully created an Expert Profile  :)</p>
          </div>
        </div>
      
        <footer>
          &copy; 2023 BuySellBiz. All rights reserved.
        </footer>
      
      </body>
      </html>
                      `,
      params: {
        role: 'Frontend',
      },
    })
    .then(res =>{
      console.log("email sent Successfully ")
      return {Success : true , res}

    })
    .catch(err => {
      console.log("failed to send email")
      return {Success : false, err}
    });
}

module.exports = switchedToTheBroker;
