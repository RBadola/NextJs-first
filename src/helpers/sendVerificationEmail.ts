import { resend } from "@/lib/resend"
import Email from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"


export async function sendVerificationMail(email: string, username: string, verifyCode:string) :Promise<ApiResponse> {
    try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: '"Blogapp Verification Code',
          react: Email({username,otp: verifyCode }),
        });
    
        return {success:false,message:"Verification email sent successfully"}
      } catch (error) {
        return { success:false,message:"Failed to send verification email." }
      }
}

