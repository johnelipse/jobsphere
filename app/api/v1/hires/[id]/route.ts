import { db } from "@/lib/db";
import { MutationHireResponse, SingleHireQueryResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<SingleHireQueryResponse>> {
  const { id } = await params;
  try {
    const invitation = await db.hire.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
      },
    });

    return NextResponse.json(
      {
        data: invitation,
        message: "invitation fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        data: null,
        message: "Failed to fetch invitation",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<MutationHireResponse>> {
  const { id } = await params;
  const data = await req.json();
  // console.log("API Data ✅:", data);

  try {
    const updatedinvitation = await db.hire.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      {
        data: updatedinvitation,
        success: true,
        message: "invitation updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to update invitation",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<MutationHireResponse>> {
  const { id } = await params;
  try {
    await db.hire.delete({
      where: { id },
    });
    return NextResponse.json(
      {
        success: true,
        message: "invitation deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        success: false,
        message: "Failed to delete invitation",
      },
      { status: 500 }
    );
  }
}
