var admin = require("firebase-admin");
var serviceAccount = require('./testproject-ee85b-firebase-adminsdk-xqqit-83cf3077ea.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




async function sendPushNotification(payload ) {
   


    let messege = {
        notification: {
          title: payload.title,
          body : payload.body,
          
        },
        
        data: {
          title: payload.bodyTitle ? payload.bodyTitle : "" ,
          info : payload.bodyInfo ? payload.bodyInfo : "",
          click_action: payload.action ? payload.action : "",
        },
        token: payload.fcm_token,

      };
    

      console.log({messege})

    try {
    const response = await admin.messaging().send(messege)
    console.log({response})
    return response
    } catch (error) {
     console.log(error)
    }
  }
  
  module.exports = {sendPushNotification };
  

