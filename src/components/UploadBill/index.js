import React from "react";
import BillForm from   "../Forms/";
import UploadFile from "../UploadFile/";
import './UploadBill.css'

function UploadBill() {
  return (
    <div className="containerUpload">
      <BillForm></BillForm>
      <UploadFile></UploadFile>
    </div>
  )
}

export default UploadBill

