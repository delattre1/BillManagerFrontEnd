import React from 'react';
import './form.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Button, Input } from '@material-ui/core';
import InputMask from 'react-input-mask';
import axios from 'axios';



const BillForm = () => {
  function postBill(bill) {
    axios
      .post('http://127.0.0.1:8000/api/bills/', bill)
      .then((res) => {
        console.log(res.data)
      })
  };

  const CustomInputComponent = (props) => (
    <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange}>
      {(inputProps) => <Input name={props.name} placeholder={props.placeholder} {...inputProps}/>}
    </InputMask>
  );

 return (
   <Formik initialValues={{ empresa: '' , valor: '', vencimento: '', codigoPagamento: ''}} onSubmit={(data, {setSubmitting}) => {
     setSubmitting(true);
     postBill(data);
     setSubmitting(false);
   }}>
   {({values, isSubmitting}) => (
       <Form className='inputsContainer'>
          <Field placeholder="Empresa"    name="empresa"    as={TextField}></Field>
          <Field placeholder="Valor"      name="valor"      as={TextField}></Field>
          <Field placeholder="Vencimento" name="vencimento" as={CustomInputComponent} />
          <Field placeholder="Codigo"     name="codigoPagamento" as={TextField}></Field>

          <Button disabled={isSubmitting} type="submit">Submit</Button>
       </Form>
     )
   }
   </Formik>
 );
};

export default BillForm
