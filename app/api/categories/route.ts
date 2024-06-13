import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    const { name, imageUrl } = await req.json();

    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!imageUrl)
      return NextResponse.json("ImageUrl is required", { status: 400 });

    const category = await prismadb.category.create({
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    const categories = await prismadb.category.findMany({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
