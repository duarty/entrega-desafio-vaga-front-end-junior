import { useState } from 'react';
import axios from 'axios';
import { RequestData, ResponseData } from '../interfaces/interfaces';

export const onSubmitFunction = async (data: RequestData): Promise<void> => {
  const [response, SetResponse] = useState<ResponseData>();
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
