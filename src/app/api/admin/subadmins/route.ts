import { NextRequest, NextResponse } from 'next/server';
import Subadmin from '@/models/Subadmin';
import { connectToDatabase } from '@/config/DbConnect';


// GET all items
export async function GET() {
  try {
    await connectToDatabase();
    const data = await Subadmin.find({isDelete: false}).sort({ createdAt: -1 });
    return NextResponse.json(
      { data, status: 200, message: "Data fetch successully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server error", data: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST create a new item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const existingSubadmin = await Subadmin.findOne({ email: body.email, isDelete: false });
    if (existingSubadmin) {
      return NextResponse.json(
        { status: 400, message: "Email already exists" },
        { status: 400 }
      );
    }
    const resp = await Subadmin.create(body);
    return NextResponse.json(
      { data: resp, status: 201, message: "Subadmin added successully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server error", data: (error as Error).message },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   await connectToDatabase();
//   const data = await Subadmin.find({});
//   return NextResponse.json(data);
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   if (!body.name || !body.email)
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

//   await connectToDatabase();
//   const created = await Subadmin.create(body);
//   return NextResponse.json(created, { status: 201 });
// }

// export async function PUT(req: Request) {
//   const { _id, ...rest } = await req.json();
//   if (!_id) return NextResponse.json({ error: 'ID missing' }, { status: 400 });

//   await connectToDatabase();
//   const updated = await Subadmin.findByIdAndUpdate(_id, rest, { new: true });
//   return updated
//     ? NextResponse.json(updated)
//     : NextResponse.json({ error: 'Not found' }, { status: 404 });
// }

// export async function DELETE(req: Request) {
//   const { _id } = await req.json();
//   if (!_id) return NextResponse.json({ error: 'ID missing' }, { status: 400 });

//   await connectToDatabase();
//   await Subadmin.findByIdAndDelete(_id);
//   return NextResponse.json({ success: true });
// }
