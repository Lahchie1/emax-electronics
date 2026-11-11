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

