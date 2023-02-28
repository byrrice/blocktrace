
const axios = require("axios");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Ideally would call controller for encapsulation puposes
app.post("/blocktrace", async (req, res) => {
  try {
    let response = await axios.post("https://fusion.blocktrace.com/api/v1/bulk/ca/cluster/summary/all",
      {
        addresses: req.query.addresses
      },
      {
        headers: {
          'api_key': req.query.apiKey
        },
        params: {
          type: req.query.type
        }
      })
    res.json(response.data);
  } catch (err) {
    res.status(err.response.status).send({
      message: err.response.data.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
