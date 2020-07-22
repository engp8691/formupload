const FormData = require('form-data');
const { request } = require('http');
const { createReadStream, readFileSync } = require('fs');
 
const readStream = createReadStream('./photo.jpg');
console.log(readStream);

const buffer = readFileSync('./photo.jpg');
 
const form = new FormData();
// form.append('file', readStream);
// form.append('file', readFileSync('./photo.jpg'));
// form.append('file', new Buffer(10));
// form.append('file', "TEST");
form.append('file', buffer, {
  filename: 'myfile.jpg',
  contentType: 'image/jpg'
});
form.append('firstName', 'Marcin');
form.append('lastName', 'Wanago');
 
const req = request(
  {
    host: 'localhost',
    port: '3000',
    path: '/upload',
    method: 'POST',
    headers: form.getHeaders(),
  },
  response => {
    console.log(response.statusCode); // 200
  }
);
 
form.pipe(req);
