import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    if (!productId)
      return new NextResponse("ProductId is required", { status: 401 });
    const product = await prismadb.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[GET_PRODUCT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("ProductId is required", { status: 401 });
    }
    const { name, categoryId, images, description } = await req.json();

    if (!name) return NextResponse.json("Name is required", { status: 400 });

    if (!description)
      return NextResponse.json("Description is required", { status: 400 });
    if (!images.length)
      return NextResponse.json("Images are required", { status: 400 });
    if (!categoryId)
      return NextResponse.json("CategoryId is required", { status: 400 });

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        categoryId,
        images: {
          deleteMany: {},
        },
        description,
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json("Not authenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("ProductId is required", { status: 401 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
