import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobQueriesResponse, MutationJobResponse } from "@/types/types";
import { actionTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<JobQueriesResponse>> {
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
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { company: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { country: { contains: search, mode: "insensitive" } },
        ];
      }

      const total = await db.job.count({ where });

      const jobs = await db.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          applications: true,
          category: true,
          User: true,
        },
      });

      return NextResponse.json(
        {
          data: jobs,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
          message: "jobs fetched successfully",
        },
        { status: 200 }
      );
    } else {
      // Return all items without pagination
      const jobs = await db.job.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          applications: true,
          category: true,
          User: true,
        },
      });

      return NextResponse.json(
        {
          data: jobs,
          meta: {
            total: jobs.length,
            page: 1,
            limit: jobs.length,
            totalPages: 1,
          },
          message: "jobs fetched successfully",
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
        message: "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<MutationJobResponse>> {
  const data = await req.json();
  const userId = req.headers.get("userId") as string;
  try {
    const newJob = await db.job.create({
      data,
    });
    await db.activityLog.create({
      data: {
        userId: userId,
        action: actionTypes.CREATED,
        description: `Job titled "${newJob.title}" created.`,
        details: {
          jobId: newJob.id,
          title: newJob.title,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newJob,
        message: "Job created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: "Failed to create job",
      },
      { status: 500 }
    );
  }
}
