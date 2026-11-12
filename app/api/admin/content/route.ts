import { NextResponse } from "next/server";
import { DataService } from "@/lib/supabase/data-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");

    if (pageId) {
      const content = await DataService.getPageContent(pageId);
      return NextResponse.json({ content });
    }

    const all = await DataService.getAllPageContents();
    return NextResponse.json({ contents: all });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageId, content, actorEmail } = body;

    if (!pageId || !content) {
      return NextResponse.json({ error: "Missing pageId or content" }, { status: 400 });
    }

    await DataService.updatePageContent(pageId, content, actorEmail || "admin@emaxelectronics.ng");

    return NextResponse.json({ success: true, pageId, content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update content" }, { status: 500 });
  }
}

