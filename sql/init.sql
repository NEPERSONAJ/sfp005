-- Enable RLS for all tables
ALTER TABLE license_system.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_system.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_system.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_system.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_system.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create admin authentication function with search path
CREATE OR REPLACE FUNCTION license_system.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  SET search_path TO license_system, public;
  RETURN EXISTS (
    SELECT 1 
    FROM user_profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create license key generation function with search path
CREATE OR REPLACE FUNCTION license_system.generate_license_key(
    product_id UUID,
    product_identifier TEXT,
    user_id UUID
) RETURNS TEXT AS $$
DECLARE
    license_key TEXT;
BEGIN
    SET search_path TO license_system, public;
    -- Generate a unique license key based on inputs
    license_key := encode(
        digest(
            product_id::text || product_identifier || user_id::text || now()::text,
            'sha256'
        ),
        'hex'
    );
    RETURN license_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;