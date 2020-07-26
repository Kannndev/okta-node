const express = require('express');
const app = express();
const port = 3000;
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{okta-domain}/oauth2/default', // required
});

app.use(function (req, res, next) {
  const authHeader = req.header('authorization');
  const token = authHeader.split(' ')[1];
  oktaJwtVerifier
    .verifyAccessToken(token, 'api://default')
    .then((jwt) => {
      console.log('token is valid', jwt);
      next();
    })
    .catch((err) => {
      console.warn('token failed validation');
      res.status(401).send('Unauthorized');
    });
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
