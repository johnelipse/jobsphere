import { db } from "@/lib/db";
import {
  MutationApplicationResponse,
  SingleApplicationQueryResponse,
} from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<SingleApplicationQueryResponse>> {
  const { id } = await params;
  try {
    const application = await db.application.findUnique({
      where: {
        id,
      },
      include: {
        applicant: true,
        job: true,
      },
    });

    return NextResponse.json(
      {
        data: application,
        message: "Application fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        data: null,
        message: "Failed to fetch Application",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<MutationApplicationResponse>> {
  const { id } = await params;
  const data = await req.json();

  try {
    const updatedApplication = await db.application.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      {
        data: updatedApplication,
        success: true,
        message: "Application updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to update Application",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<MutationApplicationResponse>> {
  const { id } = await params;
  try {
    await db.application.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Application deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to delete Application",
      },
      { status: 500 }
    );
  }
}
