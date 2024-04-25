import Response from "@/utils/response";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";


connect();

export async function POST(request) {
	try {
    const reqBody = await request.json();
    const { email, password, name } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return NextResponse.json(
            new Response(400, "User already exists", null),
            { status: 400 },
        );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
        email,
        name,
        password: hashedPassword,
        domains:[],
        role: "coordinator",
    });
    const savedUser = await newUser.save();

    // Send welcome email to the newly created user
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "yogeshpk2104@gmail.com", // Update with your Gmail email
            pass: "aazamphudpetjheq", // Update with your Gmail password
        },
    });

    const mailOptions = {
        from: "your@gmail.com", // Update with your Gmail email
        to: email,
        subject: "Welcome to Our Platform",
        text: `Hello ${name},\n\nWelcome to our platform! Your account has been successfully created in ResearchHouse. \n Your credentials are as follows : \nemail : ${email} \n password : ${password} `,
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });

    return NextResponse.json(
        new Response(200, "Coordinator created successfully", savedUser),
        { status: 200 },
    );
} catch (error) {
    return NextResponse.json(new Response(500, error.message, null), {
        status: 500,
    });
}

}
