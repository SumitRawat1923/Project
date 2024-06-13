import React from "react";
import { format } from "date-fns";
import { ProductColumn } from "./components/columns";
import ProductClient from "./components/Client";
import prismadb from "@/lib/prismadb";

async function ProductsPage() {
  const products = await prismadb.product.findMany({
    include: { category: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}

export default ProductsPage;
