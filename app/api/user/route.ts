import { createUser } from "@/services/user";
import { User } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const newUser: User = await req.json()
		const user = await createUser(newUser)
		return NextResponse.json({
			user,
			success: 'User created succesfully.'
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
