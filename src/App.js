import Bill from "./components/Bill/";
import SignupForm from "./components/Forms/";
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
      <SignupForm></SignupForm>
      <Bill bills={bills}></Bill>
    </div>
  )
}

export default App;
