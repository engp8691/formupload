const FormData = require('form-data');
const { request } = require('http');
const { createReadStream } = require('fs');
 
const readStream = createReadStream('./photo.jpg');
 
const form = new FormData();
form.append('file', readStream);
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
