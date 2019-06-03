const express = require('express');
const axios = require('axios');
const path = require('path');
require('custom-env').env('development');

const PORT = process.env.PORT || 9000;

const app = express();

axios.defaults.baseURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = process.env.API_KEY;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './react/build')));

app.get('/quotes/latest', async (req, res) => {
  const { symbol, convert } = req.query;
  try {
    const response = await axios.get(`/quotes/latest?symbol=${symbol}&convert=${convert}`);
    res.status(200).json(response.data);
  } catch (e) {
    if (!e.response) {
      //  If special header is undefined
      res.status(400).json({ error: e.message });
    } else {
      if (!e.response.data.status) res.status(400).json({ error: 'Ooops...' });
      const { error_code: status, error_message: error } = e.response.data.status;
      res.status(status).json({ error });
    }
  }
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './react/build', 'index.html'));
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
