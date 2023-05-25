export interface User {
  id?: number;
  name: string;
  mail: string;
  password: string;
  isSupplier: boolean;
  companyName?: string | null;
}
