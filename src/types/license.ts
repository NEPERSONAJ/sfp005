export interface License {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  plan_id: string;
  license_key: string;
  product_identifier: string;
  status: 'active' | 'expired' | 'suspended';
  starts_at: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}