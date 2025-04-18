import CategoryDetailPage from "@/components/front-end/category-page";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <CategoryDetailPage slug={slug} />
    </div>
  );
}
