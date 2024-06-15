"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => {
            router.push(`/categories/new`);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Category." />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}

export default CategoryClient;
