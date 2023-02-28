import { useEffect, useState } from 'react';
import axios from 'axios';
import './FormComponent.css';

function FormComponent() {

  const [cryptoAddress, setCryptoAddress] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [cryptoAddressType, setCryptoAddressType] = useState("");
  const [message, setMessage] = useState("");

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
      //         "3NV7CWkxKmf997KfDKNxS9by8mV6bxh4sn"
      //       ],
      //       apiKey: 'BT-9484d2ac-2056-4c9b-aadd-828bb34a3317'
      //     }
      //   })
      let res = await axios.post("/blocktrace",
      {},
      {
        params: {
          type: cryptoAddressType,
          addresses: cryptoAddress.split(/\s+/),
          apiKey: apiKey
        }
      })
      console.log(res.data);
      if (res.status === 200) {
        // setCryptoAddress("");
        // setApiKey("");
        setMessage("Data Successfully Fetched");
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
    </div>
  );
}

export default FormComponent;
