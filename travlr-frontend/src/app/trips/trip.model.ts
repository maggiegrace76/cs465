export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;     // days
  start: string;      // ISO date string
  resort: string;
  perPerson: number;  // price
  image?: string;
  description?: string;
}