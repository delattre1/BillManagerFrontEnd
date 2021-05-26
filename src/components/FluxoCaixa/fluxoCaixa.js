import React from 'react';
import './fluxoCaixa.css';
import { Formik, Field, Form, useField, FieldArray} from 'formik';
import { TextField, Button, Input, Radio,FormControlLabel,   Select, MenuItem } from '@material-ui/core';
import InputMask from 'react-input-mask';
import axios from 'axios';

import styled from "styled-components";

const FlexDivRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const GridDivInput = styled.div`
  display: grid;
  grid-template-columns: 20% 70% 10%;
`;

const MyRadio = (props) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={props.label} />;
}

const CaixaForm = () => {
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
   <Formik initialValues={{ valor: '', data: '', tipoOperacao: 'Despesa', pets: [{data:"", valor: "jarvis", id: `${Math.random()}` }] }} onSubmit={(data, {setSubmitting}) => {
     setSubmitting(true);
     postBill(data);
     setSubmitting(false);
   }}>
   {({values, isSubmitting}) => (
       <Form className='inputsContainer'>
          <FlexDivRow>
            <MyRadio name="tipoOperacao" type="radio" value="Despesa" label="Despesa" />
            <MyRadio name="tipoOperacao" type="radio" value="Aporte" label="Aporte" />
          </FlexDivRow>   

          <FieldArray name="pets">
              {arrayHelpers => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        data: "",
                        valor: "",
                        id: `${Math.random()}`
                      })
                    }
                  >
                    add pet
                  </Button>

                  {values.pets.map((pet, index) => {
                    return (
                      <div key={pet.id}>

                        <GridDivInput>
                          <Field placeholder="Data"  name={`operacoes.${index}.data}`}   as={CustomInputComponent} />
                          <Field placeholder="Valor" name={`operacoes.${index}.valor}`}  as={TextField}></Field>
                          <Button onClick={() => arrayHelpers.remove(index)}> x </Button>
                        </GridDivInput>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>


          <GridDivInput>
            <Field placeholder="Data" name="data" as={CustomInputComponent} />
            <Field placeholder="Valor"      name="valor"      as={TextField}></Field>
          </GridDivInput>
          <pre>{JSON.stringify(values, null,2)}</pre>
          <Button disabled={isSubmitting} type="submit">Submit</Button>
       </Form>
     )
   }
   </Formik>
 );
};

export default CaixaForm

