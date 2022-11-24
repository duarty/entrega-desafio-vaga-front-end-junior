import { InputInterface } from '../../interfaces/interfaces';

export const Input = (props: InputInterface): JSX.Element => {
  const { placeHolderName } = props;
  return <input className="input-field" placeholder={placeHolderName}></input>;
};
