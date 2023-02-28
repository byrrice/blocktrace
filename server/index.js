
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

// app.post("/blocktrace", async (req, res) => {
//   console.log(req.query)
//   try {
//     let data = await axios.post("https://fusion.blocktrace.com/api/v1/bulk/ca/cluster/summary/all",
//       {
//         addresses: [
//           "36azMEqtTmt2m5PJb4QmWydL8kL1HPHs8d",
//           "35EHWhDeYrYkMgq8e8wBBnXbEUVNaw5kys",
//           "3NV7CWkxKmf997KfDKNxS9by8mV6bxh4sn"
//         ]
//       },
//       {
//         headers: {
//           'api_key': 'BT-9484d2ac-2056-4c9b-aadd-828bb34a3317'
//         },
//         params: {
//           type: 'btc'
//         }
//       })
//     res.json(data.data);
//   } catch (err) {
//     console.log(err);
//     res.statusCode(err.status)
//   }
// });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});