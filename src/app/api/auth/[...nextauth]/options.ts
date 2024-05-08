import  bcrypt from 'bcryptjs';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                   const user = await UserModel.findOne({
                        $or:[
                            {username:credentials.identifier},{email:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new ErrorEvent("No user found!")
                    }
                    if(!user.isVerified){
                        throw new ErrorEvent("Please verify your account first!")
                    }
                    const password = await bcrypt.compare(credentials.password,user.password)
                    
                } catch (error:any) {
                    throw new Error(error)
                }
            }

        })

    ]
} 