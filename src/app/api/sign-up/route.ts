import { sendVerificationMail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists!"
            },
                {
                    status: 400
                }
            )
        }
        const userByEmail = await UserModel.findOne({email})
        const verifyCode= Math.floor(100000 + Math.random()*900000).toString()
        if(userByEmail){
            if(userByEmail.isVerified){
                return Response.json({
                    success: true,
                    message: "Username already registered"
                },
                    {
                        status: 200
                    }
                )
            }else{
                userByEmail.verifyCode = verifyCode
                userByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await userByEmail.save()
            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            const newUser = new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                message:[],
                createdAt: new Date()
            })
            await newUser.save()
        }
        //  send verification email
     
        const verificationMail = await sendVerificationMail(email,username,verifyCode)
        if(verificationMail.success){
            return Response.json({
                success: true,
                message: "Verication Code has been sent to your registered email. Please verify your account"
            },
                {
                    status: 201
                }
            )
        }else{
            return Response.json({
                success: false,
                message: verificationMail.message
            },
                {
                    status: 500
                }
            )
        }

      
    } catch (error) {
        console.error("Error registering user", error)
        return Response.json({
            success: true,
            message: "Error Registering User"
        },
            {
                status: 500
            })
    }
}