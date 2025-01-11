import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_API_SERVER!,
})

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: "L'adresse e-mail est requise." },
                { status: 400 }
            )
        }

        const res = await mailchimp.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID!,
            { email_address: email, status: "subscribed" }
        )

        return NextResponse.json(
            { message: "L'adresse e-mail a été inscrite avec succès.", data: res },
            { status: 201 }
        )

    } catch (error : any) {
        console.log(error.response)
        return NextResponse.json(
            { error: "Cette adresse e-mail est déjà inscrite ou n'existe pas." },
            { status: 500 }
        )
    }
}