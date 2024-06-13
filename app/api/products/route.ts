import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    const { name, categoryId, images, description } = await req.json();

    if (!name) return NextResponse.json("Name is required", { status: 400 });
    if (!description)
      return NextResponse.json("Description is required", { status: 400 });

    if (!images.length)
      return NextResponse.json("Images are required", { status: 400 });

    if (!categoryId)
      return NextResponse.json("CategoryId is required", { status: 400 });

    const product = await prismadb.product.create({
      data: {
        name,
        description,
        categoryId,
        images: {
          create: images.map((image: { url: string }) => ({ url: image.url })),
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const products = await prismadb.product.findMany({
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
