"use client";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
interface CategoryFormProps {
  initialData: Category | null;
}

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(4),
});

type TypeFormSchema = z.infer<typeof formSchema>;

function CategoryForm({ initialData }: CategoryFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const title = initialData ? "Edit category" : "Create category";
  const desc = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save Changes" : "Create";
  const form = useForm<TypeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "" },
  });
  const onSubmit = async (data: TypeFormSchema) => {
    try {
      if (initialData) {
        await axios.patch(`/api/resources/categories/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/resources/categories`, data);
      }
      router.push(`/categories`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/resources/categories/${params.categoryId}`);
      router.push(`/categories`);
      router.refresh();
      toast.success("Category deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onclose={() => setOpen(false)}
        loading={form.formState.isSubmitting}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={desc} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={form.formState.isLoading}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onRemove={() => {
                      field.onChange("");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category name"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default CategoryForm;
