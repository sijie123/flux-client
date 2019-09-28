const createWTClient = require('@wetransfer/js-sdk');
const config = require('./config.js');
const fs = require('fs');
const request = require('request');

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
}

async function upload(file, server) {
  // An authorization call is made when you create the client.
  // Keep that in mind to perform this operation
  // in the most suitable part of your code
  const wtClient = await createWTClient(config.weTransferAPIKey);

  const content = await readFile(file);
  const transfer = await wtClient.transfer.create({
    message: 'Download complete!',
    files: [
      {
        name: 'download.zip',
        size: content.length,
        content: content
      }
    ]
  });

  request(server, { id: jobID, url: transfer.url }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
  });
}

if (process.argv.length !== 4) {
  console.error('Expected two arguments!');
  process.exit(1);
}

upload(process.argv[2], process.argv[3]);