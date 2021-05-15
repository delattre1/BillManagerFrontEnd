import Bill from "./components/Bill/";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost:8000/api/bills/")
    .then((res) => setBills(res.data));
  }, []);
  
  
  return (
    <div>
      <Bill bills={bills}></Bill>
    </div>
  )
}

export default App;
