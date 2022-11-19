import axios from 'axios';
import { useState } from 'react';
import { RequestData, ResponseData } from './interfaces/interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './app.css';

function App(): JSX.Element {
  const formSchema = yup.object().shape({
    amount: yup
      .number()
      .positive()
      .integer()
      .required('Insira a quantia.')
      .min(1000, 'Amount deve ser maior ou igual a 1000'),
    installments: yup
      .number()
      .positive()
      .integer()
      .required('Insira a quantia.')
      .min(12, 'Installments deve ser maior ou igual a 1000'),
    mdr: yup
      .number()
      .positive()
      .integer()
      .required('Insira a quantia.')
      .min(100, 'Mdr deve ser maior ou igual a 100'),
    days: yup.array(),
  });

  const [response, SetResponse] = useState<ResponseData>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = async (data: RequestData): Promise<void> => {
    await axios
      .post('https://frontend-challenge-7bu3nxh76a-uc.a.run.app/', data)
      .then((response) => {
        SetResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(response);
  };

  /*  const dataSubmit: RequestData = {
    amount: 15000// >1000,
    installments: 3// <12,
    mdr: 4// <100,
    days: [30, 60, 90],
  }; */

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="amount" {...register('amount')}></input>
        {errors.amount && errors.amount?.message}
        <input placeholder="installments" {...register('installments')}></input>
        {errors.installments && errors.installments?.message}
        <input placeholder="mdr" {...register('mdr')}></input>
        {errors.mdr && errors.mdr?.message}
        <button type="submit">Calcular</button>
      </form>
    </div>
  );
}

export default App;
