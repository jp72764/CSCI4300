import { NextResponse } from "next/server";
import { getChatResponse } from "@/lib/openaiService";
import Resume from "@/models/Resume"; // Import the Resume model
import connectMongoDB from "../../../../config/mongodb";

// POST: Get feedback (Existing route)
export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const { prompt, role } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
        }

        const feedback = await getChatResponse(prompt, role || "general");
        return NextResponse.json({ feedback });

    } catch (error) {
        console.error("Feedback error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// PUT: Update an existing resume's feedback
export async function PUT(req: Request) {
    try {
        await connectMongoDB();
        const { id, feedback } = await req.json();

        if (!id || !feedback) {
            return NextResponse.json({ message: "Missing ID or feedback" }, { status: 400 });
        }

        const updatedResume = await Resume.findByIdAndUpdate(id, { feedback }, { new: true });

        if (!updatedResume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Feedback updated successfully", resume: updatedResume }, { status: 200 });

    } catch (error) {
        console.error("Update feedback error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// DELETE: Delete a resume
export async function DELETE(req: Request) {
    try {
        await connectMongoDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Missing ID" }, { status: 400 });
        }

        const deletedResume = await Resume.findByIdAndDelete(id);

        if (!deletedResume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Resume deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
