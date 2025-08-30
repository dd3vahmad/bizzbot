import { NextResponse } from "next/server";
import { ingestData } from "@/lib/web";

export async function POST() {
  try {
    await ingestData();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log("Error: ", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
