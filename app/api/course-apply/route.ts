import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendCourseApplicationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, course_slug, course_title } = body;

    if (!name || !email || !course_slug || !course_title) {
      return NextResponse.json(
        { error: "Name, email, and course are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (supabase) {
      const { error } = await supabase.from("course_applications").insert({
        name,
        email,
        phone: phone || null,
        message: message || null,
        course_slug,
        course_title,
        status: "pending",
      });

      if (error) {
        console.error("Course application error:", error);
        return NextResponse.json(
          { error: "Failed to submit application" },
          { status: 500 }
        );
      }
    }

    await sendCourseApplicationEmail({
      name,
      email,
      phone,
      message,
      course_slug,
      course_title,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
