import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateDepartmentSchema } from '@/app/validation/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = CreateDepartmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const newDepartment = await prisma.department.create({
      data: validation.data,
    });
    return NextResponse.json(
      { message: 'department created successfully', data: newDepartment },
      { status: 201 }
    );
  } catch (error) {
    console.log('create department error', error);
    const code = (error as { code?: string }).code;
    if (code === 'P2002') {
      return NextResponse.json(
        { message: 'Department name already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(
      { message: 'departments retrieved successfully', data: departments },
      { status: 200 }
    );
  } catch (error) {
    console.log('get department error', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
