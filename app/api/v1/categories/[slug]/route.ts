import { db } from "@/lib/db";
import {
  MutationCategoryResponse,
  SingleCategoryQueryResponse,
} from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<SingleCategoryQueryResponse>> {
  const { slug } = await params;
  try {
    const category = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        jobs: true,
      },
    });

    return NextResponse.json(
      {
        data: category,
        message: "Category fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        data: null,
        message: "Failed to fetch Category",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<MutationCategoryResponse>> {
  const { slug } = await params;
  try {
    await db.category.delete({
      where: { slug },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to delete Category",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<MutationCategoryResponse>> {
  const { slug } = await params;
  const data = await req.json();

  try {
    const updatedCategory = await db.category.update({
      where: { slug },
      data,
      include: {
        jobs: true,
      },
    });

    return NextResponse.json(
      {
        data: updatedCategory,
        success: true,
        message: "Category updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to update category",
      },
      { status: 500 }
    );
  }
}
