import { addNftPaths, getUserById, getUsers, insertUser } from "@/services/user";
import { User } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
		try {
		const userId = Number(req.nextUrl.searchParams.get('userId')) 
		if(!userId){
			return NextResponse.json({
				users: await getUsers()
			}, {
				status: 201
			})
		}
		const user = await getUserById(userId)
		return NextResponse.json({
			...user
		}, {
			status: 201
		})
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.stack)
			return NextResponse.json({
				error: err.message
			}, {
				status: 404
			})
		}
	}
}
export async function POST(req: NextRequest) {
	try {
		const userId = Number(req.nextUrl.searchParams.get('userId')) 
		const {firstName, lastName, nftPath, amount} = await req.json()
		if(!userId && !nftPath && !amount){
			const user = await insertUser(firstName, lastName)
			return NextResponse.json({
				user,
				success: 'User created succesfully.'
			}, {
				status: 201
			})
		}else if(nftPath){
			await addNftPaths(userId, nftPath)
			return NextResponse.json({
				success: 'NFT added succesfully.'
			}, {
				status: 201
			})
		}

	} catch (err) {
		if (err instanceof Error) {
			console.log(err.stack)
			return NextResponse.json({
				error: err.message
			}, {
				status: 404
			})
		}
	}
}
