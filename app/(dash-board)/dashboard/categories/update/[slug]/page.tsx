import { CategoryUpdateForm } from "@/components/forms/update-category-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="w-full pt-4">
      <CategoryUpdateForm paramSlug={slug} />
    </div>
  );
}
