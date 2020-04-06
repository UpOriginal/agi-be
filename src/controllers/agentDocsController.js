const docusign = require("docusign-esign"),
  path = require("path"),
  fs = require("fs"),
  process = require("process"),
  { promisify } = require("util"),
  basePath = "https://demo.docusign.net/restapi",
  env = process.env;
const sendEnvelopeController = async (req, res) => {
  const accessToken = env.ACCESS_TOKEN;
  const accountId = env.ACCOUNT_ID;
  // Recipient Information:
  const signerName = env.SIGNER_FULLNAME;
  const signerEmail = env.SIGNER_EMAIL;

  // The document you wish to send. Path is relative to the root directory of this repo.
  const fileName = "../docuSignDocs/World_Wide_Corp_lorem.pdf";

  // client api that sends the document
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(basePath);
  apiClient.addDefaultHeader("Authorization", "Bearer " + accessToken);
  // Set the DocuSign SDK components to use the apiClient object
  docusign.Configuration.default.setDefaultApiClient(apiClient);

  // Create the envelope request
  // Start with the request object
  const envelopeDef = new docusign.EnvelopeDefinition();
  //Set the Email Subject line and email message
  envelopeDef.emailSubject = "Please sign this document sent from AGI100";
  envelopeDef.emailBlurb =
    "Attached here, is a document sent from AGI100. Please sign.";

  // Read the file from the document and convert it to a Base64String
  const pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName)),
    pdfBase64 = pdfBytes.toString("base64");

  // Create the document request object
  const doc = docusign.Document.constructFromObject({
    documentBase64: pdfBase64,
    fileExtension: "pdf",
    name: "Sample document",
    documentId: "1"
  });

  // Create a documents object array and add the doc object
  envelopeDef.documents = [doc];

  // Create the signer object with the previously provided name / email address
  const signer = docusign.Signer.constructFromObject({
    name: signerName,
    email: signerEmail,
    routingOrder: "1",
    recipientId: "1"
  });

  // Create the signHere tab to be placed on the envelope
  const signHere = docusign.SignHere.constructFromObject({
    documentId: "1",
    pageNumber: "1",
    recipientId: "1",
    tabLabel: "SignHereTab",
    xPosition: "195",
    yPosition: "147"
  });

  // Create the overall tabs object for the signer and add the signHere tabs array
  // Note that tabs are relative to receipients/signers.
  signer.tabs = docusign.Tabs.constructFromObject({ signHereTabs: [signHere] });

  // Add the recipients object to the envelope definition.
  // It includes an array of the signer objects.
  envelopeDef.recipients = docusign.Recipients.constructFromObject({
    signers: [signer]
  });
  // Set the Envelope status. For drafts, use 'created' To send the envelope right away, use 'sent'
  envelopeDef.status = "sent";

  // Send the envelope
  let envelopesApi = new docusign.EnvelopesApi(),
    // createEnvelopePromise returns a promise with the results:
    createEnvelopePromise = promisify(envelopesApi.createEnvelope).bind(
      envelopesApi
    ),
    results;

  try {
    results = await createEnvelopePromise(accountId, {
      envelopeDefinition: envelopeDef
    });
  } catch (e) {
    let body = e.response && e.response.body;
    if (body) {
      // DocuSign API exception
      res.status(401).send(`<html lang="en"><body>
                  <h3>API problem</h3><p>Status code ${e.response.status}</p>
                  <p>Error message:</p><p><pre><code>${JSON.stringify(
                    body,
                    null,
                    4
                  )}</code></pre></p>`);
    } else {
      // Not a DocuSign exception
      console.log(e);
      res.status(500).end();
    }
  }
  // Envelope has been created:
  if (results) {
    res.status(200).send(`<html lang="en"><body>
                <h1>AGI 100</h1>
                <h3>A document has been sent to your email. Please review and sign it</h3>`);
  }
};

module.exports = sendEnvelopeController;
