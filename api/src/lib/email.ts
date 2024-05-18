import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  // create reusable transporter object using SendInBlue for SMTP
  try {
    const msg = {
      from: 'Philippe Deschesnes <philippe.deschesnes@hotmail.com>',
      to: Array.isArray(to) ? to : [to], // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    }

    await sgMail.send(msg)
  } catch (e) {
    console.log(e)
    throw e
  }
}
