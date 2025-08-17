import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import os from "os";
import path from "path";
import { ingestFile } from "@/lib/files";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const tempDir = os.tmpdir();
  const tempPath = path.join(tempDir, file.name);

  try {
    fs.writeFileSync(tempPath, buffer);
    await ingestFile(tempPath, file.name);
    fs.unlinkSync(tempPath);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
