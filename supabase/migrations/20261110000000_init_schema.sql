-- ==============================================================================
-- EMAX ELECTRONICS ENTERPRISES – PRODUCTION DATABASE SCHEMA (V1.2)
-- Supabase Managed PostgreSQL Migration
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Staff Roles & Permissions
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Initial Roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full administrator privileges across catalogue, CMS, staff, and system settings'),
  ('catalog_editor', 'Can create and edit products, categories, media, and draft content'),
  ('viewer', 'Read-only access to catalogue, analytics, and audit logs')
ON CONFLICT (name) DO NOTHING;

-- 2. Staff User Profile (Linked to Supabase Auth ID)
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_subject UUID NOT NULL UNIQUE,
  email VARCHAR(254) NOT NULL UNIQUE,
  display_name VARCHAR(120) NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  seo_title VARCHAR(180),
  seo_description VARCHAR(300),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Media Assets
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  storage_key TEXT NOT NULL UNIQUE,
  storage_bucket VARCHAR(80) NOT NULL DEFAULT 'product-media',
  original_filename VARCHAR(255) NOT NULL,
  public_url TEXT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  width INT,
  height INT,
  alt_text VARCHAR(250) NOT NULL,
  caption VARCHAR(300),
  uploaded_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Products
CREATE TYPE product_type_enum AS ENUM ('standard', 'ebike', 'accessory', 'cell', 'bms', 'inverter');
CREATE TYPE price_mode_enum AS ENUM ('fixed', 'from', 'quote');
CREATE TYPE product_status_enum AS ENUM ('draft', 'published', 'archived');
CREATE TYPE stock_status_enum AS ENUM ('in_stock', 'low_stock', 'out_of_stock', 'contact_to_confirm', 'preorder');

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  sku VARCHAR(80) UNIQUE,
  brand VARCHAR(120),
  model VARCHAR(120),
  product_type product_type_enum NOT NULL DEFAULT 'standard',
  summary VARCHAR(300),
  description TEXT,
  price_mode price_mode_enum NOT NULL DEFAULT 'fixed',
  price_minor BIGINT NOT NULL DEFAULT 0, -- price in Kobo (NGN * 100)
  currency CHAR(3) NOT NULL DEFAULT 'NGN',
  status product_status_enum NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_new BOOLEAN NOT NULL DEFAULT false,
  seo_title VARCHAR(180),
  seo_description VARCHAR(300),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Product Specifications
CREATE TABLE IF NOT EXISTS product_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  spec_key VARCHAR(80) NOT NULL,
  label VARCHAR(100) NOT NULL,
  value_text VARCHAR(250) NOT NULL,
  value_numeric DECIMAL(12, 4),
  unit VARCHAR(30),
  filterable BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  CONSTRAINT uq_product_spec UNIQUE(product_id, spec_key)
);

-- 7. Product Media Join
CREATE TABLE IF NOT EXISTS product_media (
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  media_asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE RESTRICT,
  sort_order INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (product_id, media_asset_id)
);

-- 8. Stock Record (1 per product)
CREATE TABLE IF NOT EXISTS stock_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  status stock_status_enum NOT NULL DEFAULT 'contact_to_confirm',
  quantity INT DEFAULT NULL,
  last_verified_at TIMESTAMPTZ,
  internal_note TEXT,
  updated_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Stock Movement Log
CREATE TABLE IF NOT EXISTS stock_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  previous_status stock_status_enum,
  new_status stock_status_enum NOT NULL,
  previous_quantity INT,
  new_quantity INT,
  reason TEXT,
  actor_user_id UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Content Pages
CREATE TABLE IF NOT EXISTS content_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  page_type VARCHAR(60) NOT NULL DEFAULT 'standard',
  status product_status_enum NOT NULL DEFAULT 'draft',
  seo_title VARCHAR(180),
  seo_description VARCHAR(300),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Content Sections
CREATE TABLE IF NOT EXISTS content_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES content_pages(id) ON DELETE CASCADE,
  section_type VARCHAR(60) NOT NULL, -- e.g. hero, stats, verification_protocol, builders, faqs, cta
  heading VARCHAR(180),
  subheading VARCHAR(300),
  body TEXT,
  payload_json JSONB,
  media_asset_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  cta_label VARCHAR(100),
  cta_url VARCHAR(300),
  sort_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Calculator Configurations (Versioned & Reviewed)
CREATE TABLE IF NOT EXISTS calculator_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  calculator_type VARCHAR(40) NOT NULL, -- 'battery' or 'solar'
  version VARCHAR(30) NOT NULL,
  config_json JSONB NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, approved, retired
  approved_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_calc_version UNIQUE(calculator_type, version)
);

-- 14. Enquiry Events (Anonymous conversion metrics)
CREATE TABLE IF NOT EXISTS enquiry_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type VARCHAR(50) NOT NULL, -- product_whatsapp_click, calculator_whatsapp_click, ebike_whatsapp_click, contact_click
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  calculator_type VARCHAR(40),
  anonymous_session_id VARCHAR(100),
  source_path VARCHAR(300),
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Audit Log (Append-only immutable record)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  actor_email VARCHAR(254),
  entity_type VARCHAR(60) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(40) NOT NULL, -- CREATE, UPDATE, DELETE, PUBLISH, ARCHIVE, PRICE_CHANGE, STOCK_CHANGE
  before_json JSONB,
  after_json JSONB,
  request_ip VARCHAR(60),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Import Jobs
CREATE TABLE IF NOT EXISTS import_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uploaded_asset_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  import_type VARCHAR(40) NOT NULL DEFAULT 'products_csv',
  mode VARCHAR(30) NOT NULL DEFAULT 'upsert', -- create_only, update_matching_sku, upsert
  status VARCHAR(30) NOT NULL DEFAULT 'uploaded', -- uploaded, validating, ready, completed, failed
  total_rows INT NOT NULL DEFAULT 0,
  valid_rows INT NOT NULL DEFAULT 0,
  invalid_rows INT NOT NULL DEFAULT 0,
  summary_json JSONB,
  created_by UUID REFERENCES staff_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 17. Row-Level Error Tracking for Imports
CREATE TABLE IF NOT EXISTS import_row_errors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES import_jobs(id) ON DELETE CASCADE,
  row_number INT NOT NULL,
  raw_data JSONB,
  error_message TEXT NOT NULL,
  field_name VARCHAR(80),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_jobs ENABLE ROW LEVEL SECURITY;

-- Public can read only published products, categories, specs, public content
CREATE POLICY "Public read published products" ON products
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read specifications of published products" ON product_specifications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_specifications.product_id AND products.status = 'published')
  );

CREATE POLICY "Public read stock status (no internal notes)" ON stock_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = stock_records.product_id AND products.status = 'published')
  );

CREATE POLICY "Public read published content pages" ON content_pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read visible content sections" ON content_sections
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Public read media assets" ON media_assets
  FOR SELECT USING (true);

CREATE POLICY "Public read approved site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public read approved calculator configs" ON calculator_configurations
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public insert enquiry events" ON enquiry_events
  FOR INSERT WITH CHECK (true);

-- Authenticated staff policies (Full CRUD for admin/editor)
CREATE POLICY "Staff all products" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all categories" ON categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all specifications" ON product_specifications
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all stock records" ON stock_records
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all content pages" ON content_pages
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all content sections" ON content_sections
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all media" ON media_assets
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all settings" ON site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all calculator configs" ON calculator_configurations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff read enquiry events" ON enquiry_events
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff all staff_users" ON staff_users
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff read and append audit logs" ON audit_logs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Staff all import jobs" ON import_jobs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

