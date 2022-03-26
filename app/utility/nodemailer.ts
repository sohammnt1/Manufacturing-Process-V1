// import sgMail from '@sendgrid/mail'
// sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
// const msg = {
//   from: "soham.munot@coditas.com", // Change to your recipient
//   to: employeeData.email, // Change to your verified sender
//   subject: 'Account Sucessfully Created',
//   text: `Dear,${employeeData.name}. Your Account has been created here are the login credentials. EmployeeId: ${employeeData.employeeId} Password:${password}`
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error:any) => {
//     console.error(error)
//   })