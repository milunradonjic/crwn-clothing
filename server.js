const express = require('express');         // express framework
const cors = require('cors');               // cors for cross site forgery
const bodyParser = require('body-parser');  // to parse response to json
const path = require('path');               // this gets bunled in node, lets us calculate the path in the moment

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// require('stripe') gives us back a function that expecst stripe secret key as arg
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express(); // instansiate a new express app
const port = process.env.PORT || 5000; // host port

app.use(bodyParser.json()); // any body that gets passed to backend parse it as json
app.use(bodyParser.urlencoded({ extended: true })); // so it doesn't contain spaces

app.use(cors());

// server all static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
})

// req everything we got from frontend
// res is backend response to client
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  // we pass two args: body and callback
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  })
})


