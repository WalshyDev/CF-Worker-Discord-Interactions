const nacl = require('tweetnacl');
const Buffer = require('buffer').Buffer; 

const PUBLIC_KEY = '4cb880aa9d1a36799da4683c89cdcde92360acf8b6445cdcdcb702bba7228fa7';

async function handleRequest(request) {
  if (request.headers.get('X-Signature-Timestamp') === null || request.headers.get('X-Signature-Ed25519') === null) {
    return new Response('invalid request signature', { status: 401 });
  }
  const timestamp = request.headers.get('X-Signature-Timestamp');
  const signature = request.headers.get('X-Signature-Ed25519');
  const body = await request.json();

  let isVerified = false;
  try {
    isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + JSON.stringify(body)),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );
  } catch (e) {
    console.error(e);
  }
  console.log('Is verified: ' + isVerified);

  if (!isVerified) {
    return new Response('invalid request signature', { status: 401 });
  }

  if (body.type === 1) {
    return new Response(JSON.stringify({
      type: 1
    }, null, 2),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  if (body.command.name === 'test') {
    return new Response(JSON.stringify({
      type: 4,
      data: {
        content: 'This is a test command'
      }
    }, null, 2),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})