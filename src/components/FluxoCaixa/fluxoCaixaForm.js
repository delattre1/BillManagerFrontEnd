import React from 'react';
import './fluxoCaixa.css';
import { Formik, Field, Form, useField, FieldArray} from 'formik';
import { TextField, Button, Input, Radio,FormControlLabel} from '@material-ui/core';
import InputMask from 'react-input-mask';
import axios from 'axios';

import styled from "styled-components";

const FlexDivRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 2rem;
`;

const MyRadio = (props) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={props.label} />;
}

const CaixaForm = () => {
  function postMovimentacao(mov) {
    console.log(mov)
    axios
      .post('http://127.0.0.1:8000/api/movimentacoes/', mov)
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
   <Formik initialValues={{operacoes: [{id: `${Math.random()}`, tipoOperacao:"despesa", valor:"", data:"" }]}} onSubmit={(data, {setSubmitting, resetForm}) => {
     setSubmitting(true);
     data.operacoes.map((movimentacao) => {
       postMovimentacao(movimentacao);
     })
     resetForm();
     setSubmitting(false);
   }}>

   {({values, isSubmitting}) => (
       <Form className='inputsContainer'>

          <FieldArray name="operacoes">
              {arrayHelpers => (
                <div>
                  <Button
                onClick={(() => {
                  let data_input = "";
                  if (values.operacoes[0]) {
                    data_input = values.operacoes[0].data;
                  }
                  arrayHelpers.push({data: data_input, valor: "", id: `${Math.random()}`, tipoOperacao: "despesa" })
                })}
                  >
                    Add movimentação
                  </Button>

                  {values.operacoes.map((operacao, index) => {
                    return (
                      <FlexDivRow key={operacao.id}>
                        <Field placeholder="Data"  name={`operacoes.${index}.data`}   as={CustomInputComponent} />
                        <Field placeholder="Valor" name={`operacoes.${index}.valor`}  as={TextField}></Field>

                        <FlexDivRow>
                          <MyRadio name={`operacoes.${index}.tipoOperacao`} type="radio" value="despesa" label="Despesa" />
                          <MyRadio name={`operacoes.${index}.tipoOperacao`} type="radio" value="aporte" label="Aporte" />
                        </FlexDivRow>   

                        <Button onClick={() => arrayHelpers.remove(index)}> x </Button>
                      </FlexDivRow>
                    );
                  })}
                </div>
              )}
            </FieldArray>

          <Button disabled={isSubmitting} type="submit">Submit</Button>
       </Form>
     )
   }
   </Formik>
 );
};

export default CaixaForm

