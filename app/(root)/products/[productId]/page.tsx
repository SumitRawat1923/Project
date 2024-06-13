import React from "react";
import ProductForm from "./components/product-form";
import prismadb from "@/lib/prismadb";

const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  let product = null;
  if (isValidObjectId(productId)) {
    product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });
  }

  const categories = await prismadb.category.findMany({});

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 py-6">
        <ProductForm initialData={product} categories={categories} />
      </div>
    </div>
  );
}

export default ProductPage;
