import { NextResponse } from "next/server";
import { DataService } from "@/lib/supabase/data-service";
import { StockStatus } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, status, quantity } = body;

    if (!productId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await DataService.updateProductStock(productId, status as StockStatus, quantity);

    return NextResponse.json({ success: true, status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update stock" }, { status: 500 });
  }
}

