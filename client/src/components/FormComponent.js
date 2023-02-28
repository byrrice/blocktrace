import { useState } from 'react';
import axios from 'axios';
import './FormComponent.css';
import Chart from "react-apexcharts";

function FormComponent() {

  const [cryptoAddress, setCryptoAddress] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [cryptoAddressType, setCryptoAddressType] = useState("");
  const [message, setMessage] = useState("");
  const [tableData, setTableData] = useState(null);

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // let res = await axios.post("/blocktrace",
      //   {},
      //   {
      //     params: {
      //       type: 'btc',
      //       addresses: [
      //         "36azMEqtTmt2m5PJb4QmWydL8kL1HPHs8d",
      //         "35EHWhDeYrYkMgq8e8wBBnXbEUVNaw5kys",
      //         "3NV7CWkxKmf997KfDKNxS9by8mV6bxh4sn",
      //         "bc1qu0rqae6402ds038r7m6cjqqyctl4ussjc6wy474cxgl3t6utrktqvwkat4",
      //         "bc1qm8d48c6qx59umf8euk2ejnslt7gr5f6ym4mxrs06fyg647msg67ql72d8l",
      //         "bc1q7fa99vygj69cegdp6d0qnkjpkmnu5ayv22dn8cxj0xldke0ltstsz5ru27"
      //       ],
      //       apiKey: 'BT-9484d2ac-2056-4c9b-aadd-828bb34a3317'
      //     }
      //   })
      let res = await axios.post("/blocktrace",
        {},
        {
          params: {
            type: cryptoAddressType,
            addresses: cryptoAddress.trim().split(/\s+/),
            apiKey: apiKey
          }
        })
      console.log(res.data);
      if (res.status === 200) {
        // setCryptoAddress("");
        // setApiKey("");
        setTableData(res.data)
        setMessage("Data Retrieved!");
      }
    } catch (err) {
      setMessage(err.response.status + " " + err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={cryptoAddress}
          placeholder="Crypto Addresses"
          onChange={(e) => setCryptoAddress(e.target.value)}
        />
        <input
          type="text"
          value={apiKey}
          placeholder="Api Key"
          onChange={(e) => setApiKey(e.target.value)}
        />
        <input
          type="text"
          value={cryptoAddressType}
          placeholder="Cryto Address Type"
          onChange={(e) => setCryptoAddressType(e.target.value)}
        />

        <button type="submit">Submit</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>

      {tableData !== null && <div className="visualizeData"><table>
        <tr>
          <th>Address</th>
          <th>Address Name</th>
          <th>Address Type</th>
          <th>Balance</th>
          <th>Total Sent</th>
          <th>Total Received</th>
          <th>Risk Score</th>
        </tr>
        {tableData.map(({ summary: { address, name, type, balance, totalSentAmount, totalReceivedAmount, score } }, key) => {
          return (
            <tr key={key}>
              <td>{address}</td>
              <td>{name}</td>
              <td>{type}</td>
              <td>{balance}</td>
              <td>{totalSentAmount}</td>
              <td>{totalReceivedAmount}</td>
              <td>{score}</td>
            </tr>
          )
        })}
      </table>
        <Chart
          options={{
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: tableData ?
                (tableData.length >= 5
                  ? tableData.sort((a, b) => b.summary.totalSentAmount - a.summary.totalSentAmount).slice(0, 5).map(function (item) { return item["summary"]["address"]; })
                  : tableData.sort((a, b) => b.summary.totalSentAmount - a.summary.totalSentAmount).slice(0, tableData.length).map(function (item) { return item["summary"]["address"]; }))
                : []
            }
          }}
          series={[
            {
              name: "series-1",
              data: tableData ?
                (tableData.length >= 5
                  ? tableData.sort((a, b) => b.summary.totalSentAmount - a.summary.totalSentAmount).slice(0, 5).map(function (item) { return item["summary"]["totalSentAmount"]; })
                  : tableData.sort((a, b) => b.summary.totalSentAmount - a.summary.totalSentAmount).slice(0, tableData.length).map(function (item) { return item["summary"]["totalSentAmount"]; }))
                : []
            }
          ]}
          type="bar"
          width="1000"
        />
      </div>
      }
    </div>
  );
}

export default FormComponent;
