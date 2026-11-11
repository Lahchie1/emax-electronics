export type ProductType = 'standard' | 'ebike' | 'accessory' | 'cell' | 'bms' | 'inverter';
export type PriceMode = 'fixed' | 'from' | 'quote';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'contact_to_confirm' | 'preorder';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string | null;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_key: string;
  label: string;
  value_text: string;
  value_numeric?: number | null;
  unit?: string | null;
  filterable: boolean;
  sort_order: number;
}

export interface ProductMedia {
  id: string;
  product_id: string;
  media_asset_id: string;
  public_url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

export interface StockRecord {
  id: string;
  product_id: string;
  status: StockStatus;
  quantity?: number | null;
  last_verified_at?: string | null;
  internal_note?: string | null;
}

export interface Product {
  id: string;
  category_id: string;
  category?: Category;
  name: string;
  slug: string;
  sku?: string | null;
  brand?: string | null;
  model?: string | null;
  product_type: ProductType;
  summary?: string | null;
  description?: string | null;
  price_mode: PriceMode;
  price_minor: number; // In Kobo (NGN * 100)
  currency: string;
  status: ProductStatus;
  is_featured: boolean;
  is_new: boolean;
  image_url: string;
  media?: ProductMedia[];
  specifications?: ProductSpecification[];
  stock?: StockRecord;
  seo_title?: string | null;
  seo_description?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

// Calculators Types
export interface BatteryPackInputs {
  systemVoltage: 12 | 24 | 48; // Volts
  chemistry: 'lifepo4' | 'nmc';
  cellCapacityAh: number; // e.g. 100, 280, 314
  parallelCount: number; // P strings
  dailyUsageKwh?: number;
}

export interface BatteryPackResult {
  seriesCount: number; // S cells
  parallelCount: number; // P cells
  totalCells: number;
  nominalVoltage: number; // e.g. 51.2V
  totalCapacityAh: number; // e.g. 280Ah
  totalEnergyKwh: number; // e.g. 14.33 kWh
  usableEnergyKwh: number; // 80% DOD recommended
  recommendedBmsSpec: string; // e.g. 16S 200A Smart Active BMS
  estimatedPackWeightKg: number;
  safetyNotice: string;
}

export interface ApplianceRow {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  hoursPerDay: number;
}

export interface SolarGeneratorInputs {
  appliances: ApplianceRow[];
  autonomyDays: number; // typically 1 or 2
  systemVoltage: 12 | 24 | 48;
  inverterSurgeMargin?: number; // e.g. 1.25 (25%)
}

export interface SolarGeneratorResult {
  dailyEnergyWh: number;
  dailyEnergyKwh: number;
  peakLoadWatts: number;
  recommendedInverterVa: number;
  recommendedBatteryKwh: number;
  recommendedBatteryAh: number;
  recommendedPvWattage: number;
  assumptions: string[];
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  description?: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_email?: string;
  entity_type: string;
  entity_id: string;
  action: string;
  before_json?: any;
  after_json?: any;
  created_at: string;
}

