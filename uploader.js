const createWTClient = require('@wetransfer/js-sdk');
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

function readSecretKey() {
  let key = fs.readFileSync("/flux/flux-client/secret.txt", "utf8");
  console.log(key);
  return key;
}

async function upload(file, server, hash) {
  // An authorization call is made when you create the client.
  // Keep that in mind to perform this operation
  // in the most suitable part of your code
  const wtClient = await createWTClient(readSecretKey());

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
  fs.writeFileSync("/flux/upload.txt", transfer.url, "utf8");
  request(server, { id: hash, url: transfer.url }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
  });
}

if (process.argv.length !== 5) {
  console.error('Expected three arguments!');
  process.exit(1);
}

(async () => {
    try {
        let res = await upload(process.argv[2], process.argv[3], process.argv[4]);
        fs.writeFileSync("/flux/uploaddebug.txt", "success" + res, "utf8");
    } catch (err) {
      console.log(err, err.stack);
      fs.writeFileSync("/flux/uploaddebug.txt", "fail" + err, "utf8");
        // Deal with the fact the chain failed
    }
})();