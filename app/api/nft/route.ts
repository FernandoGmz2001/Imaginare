import { NextRequest, NextResponse } from "next/server";
import path from 'path';
import fs from 'fs'
import { trimSplitAndJoin } from "@/lib/utils";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads")

if (!fs.existsSync(UPLOAD_DIR)) {
	fs.mkdirSync(UPLOAD_DIR)
}
export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const fileId = req.nextUrl.searchParams.get('fileId')
		// const file = await Upload.findOne({ _id: fileId })
		const fileBuffer = fs.readFileSync(file.filePath)
		if (!fileBuffer) {
			throw new Error('Archivo solicitado no encontrado.')
		}
		return new NextResponse(fileBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${file.fileName}"`
			}
		})
	} catch (err) {
		console.log(err)
		return NextResponse.json({
			message: "error"
		})
	}
}


export const POST = async (req: NextRequest) => {
	try {
		const { searchParams } = req.nextUrl
		const userId = searchParams.get('userId')
		//const user = await User.findById(userId)
		if (!userId /*||!user*/) {
			throw new Error('Validacion: Debe de proporcionar un cliente.')
		}
		const formData = await req.formData()
		console.log(typeof formData)
		if (!formData) {
			throw new Error('Validacion: Debe proporcionar por lo menos un archivo.')
		}
		const body = Object.fromEntries(formData)
		if (!body) {
			throw new Error('Validacion: Debe de proporcional al menos un archivo.')
		}
		const file = (body.file as Blob) || null
		const directory = `${UPLOAD_DIR}/${trimSplitAndJoin()}`
		const fileName = trimSplitAndJoin((body.file as File).name)
		const fileFullName = path.resolve(directory, fileName)
		if (!file) {
			throw new Error('Validacion: Debe proporcionar un archivo.')
		}
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory)
		}
		const buffer = Buffer.from(await file.arrayBuffer())
		fs.writeFileSync(
			fileFullName,
			buffer
		)
		return NextResponse.json({
			message: 'Archivo cargado exitosamente',
		}, {
			status: 200
		})
	} catch (err) {
		console.log(err)
		if (err instanceof Error) {
			return NextResponse.json({
				err,
				message: err.message
			}, {
				status: 400
			})
		}
	}
}

