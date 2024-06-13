import React from "react";
import CategoryForm from "./components/category-form";
import prismadb from "@/lib/prismadb";

const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

async function CategoryPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  let category = null;

  if (isValidObjectId(categoryId)) {
    category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 py-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;
