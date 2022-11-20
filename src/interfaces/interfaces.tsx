export interface RequestData {
  amount: number;
  installments: number;
  mdr: number;
  days?: Array<number>;
}

export interface ResponseData {
  '1': number;
  '15': number;
  '30': number;
  '90': number;
}
export interface InputInterface {
  placeHolderName: string;
}
