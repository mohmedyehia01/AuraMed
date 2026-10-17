import { NextRequest, NextResponse } from 'next/server';
import { UpdateDoctorSchema } from '@/app/validation/validation';
import { prisma } from '@/lib/prisma';

interface ISingleDoctorparms {
  params: Promise<{ id: string }>;
}
export const GET = async (
  request: NextRequest,
  { params }: ISingleDoctorparms
) => {
  try {
    const { id } = await params;
    const doctor = await prisma.doctor.findUnique({ where: { id } });
    if (!doctor) {
      return NextResponse.json(
        { message: 'doctor not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Doctor retrieved successfully', data: doctor },
      { status: 200 }
    );
  } catch (error) {
    console.log('invalid get doctor by id', error);
    return NextResponse.json(
      { message: 'internal server error' },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: ISingleDoctorparms
) => {
  try {
    const { id } = await params;

    const doctor = await prisma.doctor.findUnique({ where: { id } });
    if (!doctor) {
      return NextResponse.json(
        { message: 'doctor not found' },
        { status: 404 }
      );
    }
    const body = await request.json();
    const validtion = UpdateDoctorSchema.safeParse(body);
    if (!validtion.success) {
      return NextResponse.json(
        { message: validtion.error.issues[0].message },
        { status: 400 }
      );
    }
    const doctorUpdate = await prisma.doctor.update({
      where: { id: id },
      data: validtion.data,
    });
    return NextResponse.json(
      {
        message: 'doctor updated successfully',
        data: doctorUpdate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('update doctor error', error);
    const code = (error as { code?: string }).code;
    if (code === 'P2003') {
      return NextResponse.json(
        { message: 'Department does not exist' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: ISingleDoctorparms
) => {
  
  try {
    const { id } = await params;
    const doctorDeleted = await prisma.doctor.findUnique({ where: { id } });
    if (!doctorDeleted) {
      return NextResponse.json(
        { message: 'doctor not found' },
        { status: 404 }
      );
    }
    await prisma.doctor.delete({ where: { id } });
    return NextResponse.json(
      { message: 'doctor deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('invalid delete doctor by id', error);
    const code = (error as { code?: string }).code;
    if (code === 'P2003') {
      return NextResponse.json(
        { message: 'Cannot delete a doctor with related records' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
