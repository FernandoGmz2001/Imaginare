import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH as string ?? "", "public/uploads")

if (!fs.existsSync(UPLOAD_DIR)) {
	fs.mkdirSync(UPLOAD_DIR)
}
export async function GET(req:NextRequest) {
  try{
    return NextResponse.json({
      success: 'obtenido'
    })
  }catch(err){
    if(err instanceof Error){
      console.log(err.stack)
      return NextResponse.json({
        error: err.message,
      })
    }
  }
}