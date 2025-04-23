import { db } from "@/lib/db";
import { MutationJobResponse, SingleJobQueryResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<SingleJobQueryResponse>> {
  const { id } = await params;
  try {
    const job = await db.job.findUnique({
      where: {
        id,
      },
      include: {
        applications: true,
        category: true,
        User: true,
      },
    });

    return NextResponse.json(
      {
        data: job,
        message: "jobs fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        data: null,
        message: "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<MutationJobResponse>> {
  const { id } = await params;
  const data = await req.json();
  // console.log("API Data ✅:", data);

  try {
    const updatedJob = await db.job.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      {
        data: updatedJob,
        success: true,
        message: "Job updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to update job",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<MutationJobResponse>> {
  const { id } = await params;
  try {
    await db.job.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Job deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to delete job",
      },
      { status: 500 }
    );
  }
}
