// SEND A MAIL 

const nodemailer = require('nodemailer');

// Create sender
const transporter = nodemailer.createTransport({
    host: 'smtp.mailfence.com',
    port: 465,
    auth: {
        user: 'etienne.duret@mailfence.com', /* ADD YOUR MAIL  */
        pass: 'ADD YOUR PASSWAORD HERE' 
    }
});


// Verify port
transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });

// Create mail 
const mailOptions = {
    from:"etienne.duret@mailfence.com",
    to: "asathal.pierre@gmail.com", 
    subject:"Hello Lucie", 
    text: "text",
    html: '<body><h1>HTML</h1></body>'
};

// Send the mail 
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ', info);
  });

/* async function run () {
    let sendtest =  await transporter.sendMail()

console.log("message sent: ", sendtest);
};

run().catch(console.error);
 */