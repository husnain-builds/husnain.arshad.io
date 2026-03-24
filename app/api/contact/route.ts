import { NextResponse } from "next/server";
import { createContactMessage } from "@/lib/strapi";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json({ error: "Name is too short" }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message is too short" },
        { status: 400 },
      );
    }

    await createContactMessage({ name, email, message });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

