"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { DataService } from "@/lib/supabase/data-service";
import { ProductType, PriceMode, ProductStatus, StockStatus } from "@/lib/types";

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("Emax");
  const [model, setModel] = useState("");
  const [productType, setProductType] = useState<ProductType>("standard");
  const [priceMode, setPriceMode] = useState<PriceMode>("fixed");
  const [priceNaira, setPriceNaira] = useState<number>(0);
  const [stockStatus, setStockStatus] = useState<StockStatus>("in_stock");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/products/lithium-battery.jpg");
  const [status, setStatus] = useState<ProductStatus>("published");
  const [specs, setSpecs] = useState<{ key: string; label: string; value: string }[]>([
    { key: "capacity", label: "Nominal Capacity", value: "280Ah" },
    { key: "voltage", label: "Nominal Voltage", value: "3.2V" },
  ]);

  const [saving, setSaving] = useState(false);

  const handleAddSpec = () => {
    setSpecs([...specs, { key: `spec_${Date.now()}`, label: "New Spec", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await DataService.createProduct({
      name,
      slug: slug || `product-${Date.now()}`,
      sku,
      brand,
      model,
      product_type: productType,
      price_mode: priceMode,
      price_minor: priceNaira * 100,
      summary,
      description,
      image_url: imageUrl,
      status,
      specifications: specs.map((s, idx) => ({
        id: `spec-${idx}`,
        product_id: '',
        spec_key: s.key,
        label: s.label,
        value_text: s.value,
        filterable: true,
        sort_order: idx,
      })),
    });

    setSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1e3a52]">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <span className="text-[10px] uppercase font-bold text-slate-500">
          Admin Creation Mode
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-white">1. Basic Information</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. EVE LF280K v3 280Ah LiFePO4 Prismatic Cell"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                SKU / Part Number
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. EMX-EVE-280K"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. EVE Energy, JK BMS, Emax"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Type
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value as ProductType)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
              >
                <option value="standard">Standard Product</option>
                <option value="cell">Lithium Battery Cell</option>
                <option value="bms">BMS Unit</option>
                <option value="ebike">E-Bike</option>
                <option value="inverter">Solar Inverter</option>
                <option value="accessory">Hardware / Accessory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Short Summary
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief value proposition shown in search & cards"
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Technical overview, cell chemistry notes, and test report details..."
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
            />
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-white">2. Pricing & Stock Status</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Price Mode
              </label>
              <select
                value={priceMode}
                onChange={(e) => setPriceMode(e.target.value as PriceMode)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none"
              >
                <option value="fixed">Fixed Price</option>
                <option value="from">Starting From</option>
                <option value="quote">Quote on Request</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Amount (NGN ₦)
              </label>
              <input
                type="number"
                min="0"
                value={priceNaira}
                onChange={(e) => setPriceNaira(Number(e.target.value))}
                placeholder="e.g. 98500"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Stock Status
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as StockStatus)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none"
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="contact_to_confirm">Contact to Confirm (Default)</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="preorder">Pre-Order</option>
              </select>
            </div>
          </div>
        </div>

        {/* Structured Specifications */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white">3. Structured Specifications</h2>
            <button
              type="button"
              onClick={handleAddSpec}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F2A541] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Specification</span>
            </button>
          </div>

          <div className="space-y-3">
            {specs.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-center">
                <input
                  type="text"
                  placeholder="Key (e.g. capacity)"
                  value={item.key}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].key = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  className="col-span-3 text-xs px-3 py-2 rounded-lg bg-[#122436] border border-[#1e3a52] text-white"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Nominal Capacity)"
                  value={item.label}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].label = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  className="col-span-4 text-xs px-3 py-2 rounded-lg bg-[#122436] border border-[#1e3a52] text-white"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 280Ah)"
                  value={item.value}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].value = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  className="col-span-4 text-xs px-3 py-2 rounded-lg bg-[#122436] border border-[#1e3a52] text-white"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(index)}
                  className="col-span-1 text-slate-400 hover:text-rose-400 flex justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Publication Control */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-300">Publication Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#122436] border border-[#1e3a52] text-white"
            >
              <option value="published">Published (Live on site)</option>
              <option value="draft">Draft (Private staging)</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-glowTeal transition disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{saving ? "Saving to Database..." : "Save & Commit Product"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

