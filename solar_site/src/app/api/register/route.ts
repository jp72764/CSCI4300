import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import User from "../../../../src/models/User";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Connect to MongoDB
        await connectMongoDB();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ message: "An error occurred while registering the user" }, { status: 500 });
    }
}
