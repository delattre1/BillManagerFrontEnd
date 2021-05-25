import Bill from "../components/BillsTable/billsTable";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import NavBar from "../components/NavBar/navBar"

export default function Home() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost:8000/api/bills/")
    .then((res) => setBills(res.data));
  }, []);
  
  
  return (
    <div>
      <NavBar></NavBar>
      <Bill bills={bills}></Bill>
    </div>
  )
}


