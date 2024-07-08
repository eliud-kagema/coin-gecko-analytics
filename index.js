const express = require('express');
const axios = require('axios');
const app = express();
//get port from env file else default to 3000
const PORT = process.env.PORT || 4000;

const url = require('url');
const baseUrl = 'https://api.coingecko.com/api/v3/coins/list';
const apiKey = 'CG-AYvX4AtgKmmkfd9DwuHEZQYE';

// Construct the URL with the API key as a query parameter
const apiUrl = url.format({
  pathname: baseUrl,
  query: {
    api_key: apiKey
  }
});

console.log(apiUrl);

// Fetch all coins from CoinGecko API
async function fetchCoins() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
}

// Serve HTML page
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve CSS file
app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + '/styles.css');
});

// Serve fetched coins
app.get('/coins', async (req, res) => {
  const coins = await fetchCoins();
  res.json(coins);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});