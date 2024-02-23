export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  role: string;
  company_id: number;
}

export type Company = {
  id: number;
  name: string;
  industry: string;
  website: string;
  telephone: string;
  slogan: string;
  address: string;
  city: string;
  country: string;
  active: boolean;
  employees?: Employee[];
}

export type Filter = {
  active: string;
  cn: string;
  en: string;
}
