import path from "path";
import fs from "fs";
import {
  getUploadById,
  getUploads,
  getUserUploads,
  insertUpload,
} from "@/services/upload";
import { NextRequest, NextResponse } from "next/server";
import { addNftPaths, getUserById } from "@/services/user";
import { trimSplitAndJoin } from "@/lib/utils";
import { createNFT } from "@/services/nft";
import { NftPrompt } from "@/types/types";
const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

console.log(UPLOAD_DIR);
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const uploadId = Number(searchParams.get("uploadId"));
    const userId = Number(searchParams.get("userId"));
    let uploads;
    if (!uploadId && !userId) {
      uploads = await getUploads();
    } else if (uploadId) {
      uploads = await getUploadById(uploadId);
    } else {
      uploads = await getUserUploads(userId);
    }
    return NextResponse.json({
      uploads,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
      return NextResponse.json({
        error: err.message,
      });
    }
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const userId = Number(searchParams.get("userId"));
    const formData = await req.formData();
    const user = await getUserById(userId);
    if (!userId || !user) {
      throw new Error("Validacion: Debe de proporcionar un usuario.");
    }
    console.log(formData);
    if (!formData) {
      throw new Error("Validacion: Debe proporcionar por lo menos un archivo.");
    }
    const body = Object.fromEntries(formData);
    if (!body) {
      throw new Error("Validacion: Debe de proporcional al menos un archivo.");
    }
    const name = body.name as string
    const description = body.description as string
    const address = body.address as string
  if(!name || !description) throw new Error('You must provide metada for NFT.')
    const file = (body.file as Blob) || null;
    const directory = `${UPLOAD_DIR}/${trimSplitAndJoin(`${user.userId}-${user.firstName}`)}`;
    const fileName = trimSplitAndJoin((body.file as File).name);
    const fileFullName = path.resolve(directory, fileName);
    if (!file) {
      throw new Error("Validacion: Debe proporcionar un archivo.");
    }
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(fileFullName, buffer);
    const newUploadId = await insertUpload(
      fileName,
      `${directory}/${fileName}`,
      userId
    );
    if (!newUploadId) throw new Error("Error uploading the file");
    const nft: NftPrompt ={
      name,
      description
    }
    await createNFT(nft, address, userId, fileName)
    await addNftPaths(userId, newUploadId);
    return NextResponse.json(
      {
        message: "Archivo cargado exitosamente",
        uploadRef: newUploadId,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json(
        {
          err,
          message: err.message,
        },
        {
          status: 400,
        }
      );
    }
  }
};
