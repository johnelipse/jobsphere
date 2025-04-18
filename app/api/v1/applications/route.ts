import { db } from "@/lib/db";
import {
  ApplicationQueriesResponse,
  MutationApplicationResponse,
} from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApplicationQueriesResponse>> {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const limitParam = searchParams.get("limit");
    const pageParam = searchParams.get("page");

    const isPaginated = pageParam !== null || limitParam !== null;

    if (isPaginated) {
      const page = Number.parseInt(searchParams.get("page") || "1");
      const limit = Number.parseInt(searchParams.get("limit") || "10");
      const skip = (page - 1) * limit;

      const where: any = {};

      if (search) {
        where.OR = [{ status: { contains: search, mode: "insensitive" } }];
      }

      const total = await db.application.count({ where });

      const applications = await db.application.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(
        {
          data: applications,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          message: "Applications fetched successfully",
        },
        { status: 200 }
      );
    } else {
      // Return all items without pagination
      const applications = await db.application.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(
        {
          data: applications,
          meta: {
            total: applications.length,
            page: 1,
            limit: applications.length,
            totalPages: 1,
          },
          message: "Applications fetched successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
        message: "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<MutationApplicationResponse>> {
  const data = await req.json();
  try {
    const newApplication = await db.application.create({
      data,
    });
    return NextResponse.json(
      {
        success: true,
        data: newApplication,
        message: "Application created successfully.",
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
