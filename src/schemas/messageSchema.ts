import {z } from 'zod'

export const messageSchema =z.object({
    content:z.string()
    .min(10,"Content must be 10 charcters long!")
    .max(300,"Content must be no longer than 300 characters long!"),
}) 