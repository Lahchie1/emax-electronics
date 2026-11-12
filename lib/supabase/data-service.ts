import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SITE_SETTINGS } from '../seed-data';
import { Category, Product, SiteSetting, AuditLog, StockStatus } from '../types';
import { supabase, isSupabaseConfigured } from './client';

// Local in-memory repository for local development and preview
let localCategories: Category[] = [...INITIAL_CATEGORIES];
let localProducts: Product[] = [...INITIAL_PRODUCTS];
let localSettings: SiteSetting[] = [...INITIAL_SITE_SETTINGS];
let localAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    actor_email: 'admin@emaxelectronics.ng',
    entity_type: 'Product',
    entity_id: 'prod-eve-280ah',
    action: 'PUBLISH',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    after_json: { name: 'EVE LF280K v3 280Ah LiFePO4 Prismatic Cell', status: 'published' },
  },
  {
    id: 'log-2',
    actor_email: 'technician@emaxelectronics.ng',
    entity_type: 'StockRecord',
    entity_id: 'prod-emax-veloflow-ebike',
    action: 'STOCK_CHANGE',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    after_json: { status: 'in_stock', quantity: 12 },
  },
];

let localPageContents: Record<string, Record<string, string>> = {
  "p-home": {
    heroSlide1Headline: "Ride Smarter, Move Smarter.",
    heroSlide1Subhead: "Experience high-torque urban transit engineered for Lagos roads. Bypass fuel queues and rush-hour gridlock with 750W power.",
    heroSlide2Headline: "Lithium Packs, Smart Power.",
    heroSlide2Subhead: "Design and deploy custom LiFePO4 battery banks with genuine Grade-A prismatic cells, AC internal resistance <0.22mΩ.",
    heroSlide3Headline: "Smart Protection, Active Balancing.",
    heroSlide3Subhead: "Safeguard your lithium capital with genuine Daly & JBD Smart BMS hardware with Bluetooth telemetry.",
    announcementBadge: "Direct Lagos Engineering Desk",
  },
  "p-products": {
    heroBadge: "Catalogue",
    heroHeadline: "Grade-A Components, Bench Verified.",
    heroSubhead: "Browse genuine LiFePO4 cells, Smart BMS boards, flexible busbars, hybrid inverters, and e-bikes.",
  },
  "p-build": {
    heroBadge: "Engineering Sizing",
    heroHeadline: "Precision Build Calculator",
    heroSubhead: "Size your custom LiFePO4 battery banks or configure turnkey off-grid solar generator systems.",
  },
  "p-ebikes": {
    heroBadge: "Urban E-Mobility",
    heroHeadline: "Zero Petrol. Zero Gridlock.",
    heroSubhead: "High-performance electric bicycles engineered specifically for Lagos roads and daily transit.",
  },
  "p-about": {
    heroBadge: "Engineering Standard",
    heroHeadline: "Engineering Clean Energy Without Compromise.",
    heroSubhead: "Emax Electronics Enterprises was founded with one uncompromising standard: eliminating fake, downgraded lithium cells.",
  },
  "p-contact": {
    heroBadge: "Lagos Hub",
    heroHeadline: "Speak with Our Engineers.",
    heroSubhead: "Have questions on inverter sizing, cell chemistry, busbar configurations, or e-bike test rides? Reach our Ikeja technical team.",
  },
};

export const DataService = {
  // --- Public Queries ---
  async getCategories(): Promise<Category[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    }
    return localCategories.filter((c) => c.is_active);
  },

  async getProducts(categoryId?: string, search?: string): Promise<Product[]> {
    if (isSupabaseConfigured) {
      let query = supabase.from('products').select('*, category:categories(*), specifications:product_specifications(*), stock:stock_records(*)').eq('status', 'published');
      if (categoryId) query = query.eq('category_id', categoryId);
      if (search) query = query.ilike('name', `%${search}%`);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Product[];
    }
    let list = localProducts.filter((p) => p.status === 'published');
    if (categoryId) {
      list = list.filter((p) => p.category_id === categoryId);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(*), specifications:product_specifications(*), stock:stock_records(*)')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as Product;
    }
    return localProducts.find((p) => p.slug === slug) || null;
  },

  async getEBikes(): Promise<Product[]> {
    const all = await this.getProducts();
    return all.filter((p) => p.product_type === 'ebike');
  },

  async getSiteSettings(): Promise<Record<string, any>> {
    const map: Record<string, any> = {};
    for (const s of localSettings) {
      map[s.setting_key] = s.setting_value;
    }
    return map;
  },

  // --- Admin Queries & Mutations ---
  async getAllProductsAdmin(): Promise<Product[]> {
    return localProducts;
  },

  async updateProductStock(productId: string, newStatus: StockStatus, quantity?: number, actorEmail = 'admin@emaxelectronics.ng'): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('stock_records')
          .update({
            status: newStatus,
            quantity: quantity,
            last_verified_at: new Date().toISOString(),
          })
          .eq('product_id', productId);
      } catch (err) {
        console.warn('Failed to update Supabase stock record:', err);
      }
    }

    const prod = localProducts.find((p) => p.id === productId);
    if (prod) {
      const prev = prod.stock?.status;
      if (!prod.stock) {
        prod.stock = { id: `stk-${Date.now()}`, product_id: productId, status: newStatus, quantity };
      } else {
        prod.stock.status = newStatus;
        if (quantity !== undefined) prod.stock.quantity = quantity;
        prod.stock.last_verified_at = new Date().toISOString();
      }
      localAuditLogs.unshift({
        id: `log-${Date.now()}`,
        actor_email: actorEmail,
        entity_type: 'StockRecord',
        entity_id: productId,
        action: 'STOCK_CHANGE',
        before_json: { status: prev },
        after_json: { status: newStatus, quantity },
        created_at: new Date().toISOString(),
      });
    }
  },

  async getPageContent(pageId: string): Promise<Record<string, string>> {
    return localPageContents[pageId] || {};
  },

  async getAllPageContents(): Promise<Record<string, Record<string, string>>> {
    return localPageContents;
  },

  async updatePageContent(pageId: string, content: Record<string, string>, actorEmail = 'admin@emaxelectronics.ng'): Promise<void> {
    const prev = localPageContents[pageId];
    localPageContents[pageId] = { ...(localPageContents[pageId] || {}), ...content };

    localAuditLogs.unshift({
      id: `log-${Date.now()}`,
      actor_email: actorEmail,
      entity_type: 'PageContent',
      entity_id: pageId,
      action: 'UPDATE',
      before_json: prev,
      after_json: localPageContents[pageId],
      created_at: new Date().toISOString(),
    });
  },

  async createProduct(productData: Partial<Product>, actorEmail = 'admin@emaxelectronics.ng'): Promise<Product> {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      category_id: productData.category_id || localCategories[0].id,
      name: productData.name || 'New Product',
      slug: productData.slug || `product-${Date.now()}`,
      sku: productData.sku || `EMX-${Date.now().toString().slice(-4)}`,
      brand: productData.brand || 'Emax',
      model: productData.model || '',
      product_type: productData.product_type || 'standard',
      summary: productData.summary || '',
      description: productData.description || '',
      price_mode: productData.price_mode || 'fixed',
      price_minor: productData.price_minor || 0,
      currency: 'NGN',
      status: productData.status || 'draft',
      is_featured: !!productData.is_featured,
      is_new: true,
      image_url: productData.image_url || 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      stock: {
        id: `stk-${Date.now()}`,
        product_id: `prod-${Date.now()}`,
        status: 'contact_to_confirm',
        last_verified_at: new Date().toISOString(),
      },
      specifications: productData.specifications || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    localProducts.unshift(newProduct);
    localAuditLogs.unshift({
      id: `log-${Date.now()}`,
      actor_email: actorEmail,
      entity_type: 'Product',
      entity_id: newProduct.id,
      action: 'CREATE',
      after_json: { name: newProduct.name, status: newProduct.status },
      created_at: new Date().toISOString(),
    });
    return newProduct;
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    return localAuditLogs;
  },
};

