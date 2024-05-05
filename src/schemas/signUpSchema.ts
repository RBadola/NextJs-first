import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(4,"username must be atleast 4 character long!")
    .max(20,"username cannot ve longer than 20 characters long!")
    .regex(/^[a-zA-Z0-9_]+$/,"username cannot contain special charcter")



export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address!"}),
    password:z.string().min(8,{message:"Password must be atleast 8 characters!"})
})