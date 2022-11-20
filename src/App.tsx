import axios from 'axios';
import { useState } from 'react';
import { RequestData, ResponseData } from './interfaces/interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './app.css';
import { CircleLoader, ClipLoader } from 'react-spinners';

function App(): JSX.Element {
  const [response, SetResponse] = useState<ResponseData>();
  const [loading, setLoading] = useState<boolean>(false);

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
      .max(12, 'Installments deve ser menor ou igual a 12'),
    mdr: yup
      .number()
      .positive()
      .integer()
      .required('Insira a quantia.')
      .max(100, 'Mdr deve ser menor ou igual a 100'),
    days: yup.array(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = async (data: RequestData): Promise<void> => {
    setLoading(true);
    await axios
      .post(
        'https://frontend-challenge-7bu3nxh76a-uc.a.run.app/?delay=3000',
        data,
      )
      .then((response) => {
        setLoading(false);
        SetResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(response);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
        <div className="request-container">
          <div className="label-and-input-box">
            <label className="request-label">AMOUNT</label>
            <input placeholder="amount" {...register('amount')}></input>
            {errors.amount && errors.amount?.message}
          </div>
          <div className="label-and-input-box">
            <label className="request-label">INSTALLMENTS</label>
            <input
              placeholder="installments"
              {...register('installments')}
            ></input>
            {errors.installments && errors.installments?.message}
          </div>
          <div className="label-and-input-box">
            <label className="request-label">MDR</label>
            <input placeholder="mdr" {...register('mdr')}></input>
            {errors.mdr && errors.mdr?.message}
          </div>
          <button type="submit">Calcular</button>
        </div>
        <div className="response-container">
          {loading ? (
            <ClipLoader className="loading" color="#ea1d5d" />
          ) : (
            <>
              <label className="response-label">Você receberá:</label>
              <div className="response-labels-container">
                <label className="mais-um-labelkkkk">
                  1 dia: <span className="response-span">{response?.[1]}</span>
                </label>
                <label className="mais-um-labelkkkk">
                  15 dias:{' '}
                  <span className="response-span">{response?.[15]}</span>
                </label>
                <label className="mais-um-labelkkkk">
                  30 dias:{' '}
                  <span className="response-span">{response?.[30]}</span>
                </label>
                <label className="mais-um-labelkkkk">
                  90 dias:{' '}
                  <span className="response-span">{response?.[90]}</span>
                </label>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
