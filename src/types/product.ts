export interface Product {
  id: string;
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  created_at: string;
  updated_at: string;
}