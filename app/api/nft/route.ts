import { createNFT } from "@/services/nft";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = Number(req.nextUrl.searchParams.get('userId'))
    if(!userId) throw new Error("You must provide an user id")
    const { name, description, prompt, address} = await req.json();
    const result = await createNFT({ name, description, prompt }, address, userId);
    return NextResponse.json({
      success: true,
      result
    })
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
      return NextResponse.json({
        error: err.message,
      });
    }
  }
}
