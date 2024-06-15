import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    if (!categoryId)
      return new NextResponse("CategoryId is required", { status: 401 });

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("CATEGORY_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    const { name, imageUrl } = await req.json();

    if (!name) return new NextResponse("Name is required", { status: 401 });
    if (!imageUrl)
      return new NextResponse("ImageUrl is required", { status: 401 });

    if (!categoryId)
      return new NextResponse("CategoryId is required", { status: 401 });

    const category = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: { name, imageUrl },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { categoryId } }: { params: { categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 401 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
