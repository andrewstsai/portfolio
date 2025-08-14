import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequestBody {
    name: string;
    email: string;
    message: string;
}

export async function POST(req: Request) {
    try{ 
        const { name, email, message } = await req.json() as ContactRequestBody;
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
            from: 'portfolio@updates.andrewstsai.com',
            to: 'andrewstsai@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `<p>${message} <br /> <br /> ${email}</p>`
        })
        return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
    } catch (error){
        const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
        return NextResponse.json({ error: errorMessage }, { status: 500 })

    }
}