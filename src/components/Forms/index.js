import React from 'react';
import './form.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Button } from '@material-ui/core';
import InputMask from 'react-input-mask';
import axios from 'axios';

const SignupForm = () => {
  function postBill(bill) {
    axios
      .post('http://127.0.0.1:8000/api/bills/', bill)
      .then((res) => {
        console.log(res.data)
      })
  };

  const CustomInputComponent = (props) => (
    <InputMask mask="9999-99-99" {...props}/>
  );

 return (
   <Formik initialValues={{ empresa: '' , valor: '', vencimento: '', codigoPagamento: ''}} onSubmit={(data, {setSubmitting}) => {
     setSubmitting(true);
     postBill(data);
     //make async call
     console.log(data);
     setSubmitting(false);
   }}>
   {({values, isSubmitting}) => (
       <Form className='inputsContainer'>
          <Field placeholder="Empresa"    name="empresa"    as={TextField}></Field>
          <Field placeholder="Valor"      name="valor"      as={TextField}></Field>
          <Field placeholder="Vencimento" name="vencimento" as={CustomInputComponent} />
          <Field placeholder="Codigo"     name="codigoPagamento" as={TextField}></Field>

          <Button disabled={isSubmitting} type="submit">Submit</Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
       </Form>
     )
   }
   </Formik>
 );
};

export default SignupForm
