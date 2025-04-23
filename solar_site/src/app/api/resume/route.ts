import { NextResponse } from "next/server";
import Resume from "@/models/Resume"; // Import the Resume model
import connectMongoDB from "../../../../config/mongodb";

// POST: Upload new resume
export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const { userId, title, fileName, content, role } = await req.json();

        if (!userId || !title || !fileName || !content || !role) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newResume = await Resume.create({
            userId,
            title,
            fileName,
            content,
            role
        });

        return NextResponse.json(newResume, { status: 201 });

    } catch (error: any) {
        console.error("Resume upload error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
}

// GET: Get resumes, use query params to filter
export async function GET(req: Request) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId"); // get the userid if filtering by user
        // if user id is provided then filter by userid else get all the resume
        const filter = userId ? {userId: userId} : {};

        const resumes = await Resume.find(filter);
        return NextResponse.json(resumes);

    } catch (error: any) {
        console.error("Get resume error:", error);
        return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
    }
}

// PUT: update an existing resume title
export async function PUT(req: Request) {
    try {
        await connectMongoDB();
        const { id, title } = await req.json();

        if (!id || !title) {
            return NextResponse.json({ message: "Missing ID or title" }, { status: 400 });
        }

        const updatedResume = await Resume.findByIdAndUpdate(id, { title }, { new: true });

        if (!updatedResume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Title updated successfully", resume: updatedResume }, { status: 200 });

    } catch (error: any) {
        console.error("Update title error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
