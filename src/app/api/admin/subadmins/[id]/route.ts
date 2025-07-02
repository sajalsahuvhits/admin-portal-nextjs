import { NextRequest, NextResponse } from "next/server";
import Subadmin from "@/models/Subadmin";
import { connectToDatabase } from "@/config/DbConnect";

// GET a single Subadmin by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const data = await Subadmin.findById(params.id);

    if (!data) {
      return NextResponse.json(
        { status: 400, message: "Subadmin not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { data, status: 200, message: "Subadmin fetch successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
        data: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// PUT update an Subadmin
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();
    // check email already exists
    const existingSubadmin = await Subadmin.findOne({ email: body.email, _id: { $ne: params.id }, isDelete: false });
    if (existingSubadmin) {
      return NextResponse.json(
        { status: 400, message: "Email already exists" },
        { status: 400 }
      );
    }

    const updatedSubadmin = await Subadmin.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedSubadmin) {
      return NextResponse.json(
        { status: 400, message: "Subadmin not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: updatedSubadmin,
        status: 200,
        message: "Subadmin updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
        data: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE an Subadmin
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Deleting subadmin with ID:", params.id);
    await connectToDatabase();
    const deletedSubadmin = await Subadmin.findByIdAndUpdate(params.id, {isDelete: true});

    if (!deletedSubadmin) {
      return NextResponse.json(
        { status: 400, message: "Subadmin not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200, message: "Subadmin deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
        data: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
