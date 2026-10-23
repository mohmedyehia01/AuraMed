import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateDepartmentSchema } from '@/app/validation/validation';
import { IRouteParams } from '@/types/index';

export async function GET(req: NextRequest, { params }: IRouteParams) {
  try {
    const { id } = await params;
    const department = await prisma.department.findUnique({ where: { id } });
    if (!department) {
      return NextResponse.json(
        { message: 'Department not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Department retrieved successfully', data: department },
      { status: 200 }
    );
  } catch (error) {
    console.log('invalid get department by id ', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: IRouteParams) {
  try {
    const { id } = await params;
    const department = await prisma.department.findUnique({ where: { id } });
    if (!department) {
      return NextResponse.json(
        { message: 'department not found' },
        { status: 404 }
      );
    }
    const body = await req.json();
    const validation = UpdateDepartmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const departmentUpdate = await prisma.department.update({
      where: { id: id },
      data: validation.data,
    });
    return NextResponse.json(
      { message: 'department updated successfully', data: departmentUpdate },
      { status: 200 }
    );
  } catch (error) {
    console.log('invailed update department', error);
    const code = (error as { code?: string }).code;
    if (code === 'P2002') {
      return NextResponse.json(
        { message: 'Department name already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 }
    );
  }
}
export const DELETE = async (
  request: NextRequest,
  { params }: IRouteParams
) => {
  try {
    const { id } = await params;
    const departmentDeleted = await prisma.department.findUnique({
      where: { id },
    });
    if (!departmentDeleted) {
      return NextResponse.json(
        { message: 'department not found' },
        { status: 404 }
      );
    }
    await prisma.department.delete({ where: { id } });
    return NextResponse.json(
      { message: 'department deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('invalid delete department by id', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
