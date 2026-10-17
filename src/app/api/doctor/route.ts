import { NextRequest, NextResponse } from 'next/server';
import { CreateDoctorSchema } from '@/app/validation/validation';
import { prisma } from '@/lib/prisma';

export const GET = async (request: NextRequest) => {
  try {
    const doctor = await prisma.doctor.findMany();
    return NextResponse.json(
      { message: 'Doctors retrieved successfully', data: doctor },
      { status: 200 }
    );
  } catch (error) {
    console.log('get doctor error', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = CreateDoctorSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const newDoctor = await prisma.doctor.create({ data: validation.data });
    return NextResponse.json(
      { message: 'Doctor created successfully', data: newDoctor },
      { status: 201 }
    );
  } catch (error) {
    console.log('created doctor error', error);
    const code = (error as { code?: string }).code;
    if (code === 'P2002') {
      return NextResponse.json(
        { message: 'This user already has a doctor profile' },
        { status: 409 }
      );
    }
    if (code === 'P2003') {
      return NextResponse.json(
        { message: 'User or department does not exist' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
