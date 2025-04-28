import { db } from "@/lib/db";
import { HireQueriesResponse, MutationHireResponse } from "@/types/types";
import { actionTypes } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<HireQueriesResponse>> {
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
        where.OR = [{ jobTitle: { contains: search, mode: "insensitive" } }];
      }

      const total = await db.hire.count({ where });

      const hires = await db.hire.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: true,
        },
      });

      return NextResponse.json(
        {
          data: hires,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          message: "invitations fetched successfully",
        },
        { status: 200 }
      );
    } else {
      // Return all items without pagination
      const hires = await db.hire.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: true,
        },
      });

      return NextResponse.json(
        {
          data: hires,
          meta: {
            total: hires.length,
            page: 1,
            limit: hires.length,
            totalPages: 1,
          },
          message: "invitations fetched successfully",
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
        message: "Failed to fetch invitations",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<MutationHireResponse>> {
  const data = await req.json();
  try {
    const newInvite = await db.hire.create({
      data,
    });
    return NextResponse.json(
      {
        success: true,
        data: newInvite,
        message: "Invitation created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Failed to create Invitation",
      },
      { status: 500 }
    );
  }
}
