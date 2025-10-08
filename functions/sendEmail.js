// Example Netlify Function that would receive form POSTs and send email via a server-side provider.
// NOTE: This is a template and does NOT include real API keys. Configure provider (SendGrid/Mailgun) and set secrets in Netlify UI.

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Validate required fields
  if (!body.email || !body.message) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // Example: send email using provider SDK (pseudocode)
  // const sendgrid = require('@sendgrid/mail');
  // sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  // await sendgrid.send({to: 'hello@veesora.com', from: 'no-reply@veesora.com', subject: 'Website contact', text: JSON.stringify(body)})

  return {
    statusCode: 200,
    body: JSON.stringify({ok:true, message:'Received'})
  };
};