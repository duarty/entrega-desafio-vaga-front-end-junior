export interface RequestData {
  amount: number;
  installments: number;
  mdr: number;
  days?: Array<number>;
}

export interface ResponseData {
  '30': number;
  '60': number;
  '90': number;
}
