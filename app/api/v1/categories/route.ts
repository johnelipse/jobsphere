import { db } from "@/lib/db";
import {
  CategoryQueriesResponse,
  MutationCategoryResponse,
} from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<CategoryQueriesResponse>> {
  try {
    const categories = await db.category.findMany({
      include: {
        jobs: true,
      },
    });

    return NextResponse.json(
      {
        data: categories,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<MutationCategoryResponse>> {
  const data = await req.json();
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Category already exists.",
        },
        { status: 409 }
      );
    }
    const newCategory = await db.category.create({
      data,
    });
    return NextResponse.json(
      {
        success: true,
        data: newCategory,
        message: "Category created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Failed to create application",
      },
      { status: 500 }
    );
  }
}
