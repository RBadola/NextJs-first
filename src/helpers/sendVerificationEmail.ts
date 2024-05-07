import {resend} from "@/lib/resend"
import Email from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

interface mailProps{
email:string,
username:string,
}

export async function sendVerificationMail({}){
    return;
} 

