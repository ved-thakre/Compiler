import React, { useState } from 'react';
import "./App.css";
import axios from 'axios';

const App = () => {
  const [code, setcode] = useState("");
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  const handlesubmit = async () => {
    const formData = {
      language_id: 52,
      source_code: btoa(code),
      stdin: btoa(input),
    };
    const requestData = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "955ba339e8msh9f6ff9e970fc394p13f804jsn1b294763fdf1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    try {
      const response = await axios.request(requestData);
      console.log(response.data.token);
      getOutput(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const getOutput = async (token) => {
    const finalOuput = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      headers: {
        "X-RapidAPI-Key": "955ba339e8msh9f6ff9e970fc394p13f804jsn1b294763fdf1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    try {
      const finalresponse = await axios.request(finalOuput);
      console.log(finalresponse.data);
      setoutput(finalresponse.data.stdout);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p
        style={{
          margin: "20px 20px 2px 20px",
          padding: "0",
          display: "inline-block",
        }}
      >
        Code:
      </p>
      <div style={{ display: "flex" }}>
        <textarea
          type="text"
          name="Code here"
          placeholder="type code"
          value={code}
          onChange={(e) => {
            setcode(e.target.value);
          }}
          rows={44}
          color={30}
          style={{
            margin: "20px",
            marginTop: "0",
            width: "60%",
            backgroundColor: "black",
            color: "grey",
            marginBottom: "5px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "35%",
          }}
        >
          <p style={{ margin: "0", padding: "0" }}>Input</p>
          <textarea
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
            style={{ height: "250px", backgroundColor: "black", color: "grey" }}
          ></textarea>
          <p style={{ margin: "0", padding: "0", marginTop: "30px" }}>Output</p>
          <textarea
            value={output}
            onChange={(e) => {
              setoutput(e.target.value);
            }}
            style={{ height: "250px", backgroundColor: "black", color: "grey" }}
          ></textarea>
        </div>
      </div>
      <button
        onClick={handlesubmit}
        style={{
          marginLeft: "820px",
          padding: "10px 20px",
          backgroundColor: "rgb(86, 234, 99)",
          borderRadius: "5px",
          border: "2px solid black",
        }}
      >
        Run
      </button>
    </div>
  );
}

export default App