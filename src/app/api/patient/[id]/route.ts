import { NextRequest, NextResponse } from 'next/server';
import {
  
  UpdatePatientSchema,
} from '@/app/validation/validation';
import { prisma } from '@/lib/prisma';

interface ISinglePatientParams {
  params: Promise<{ id: string }>;
}

export const GET = async (
  request: NextRequest,
  { params }: ISinglePatientParams
) => {
  try {
    const { id } = await params;
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      return NextResponse.json(
        { message: 'patient not found' },
        { status: 404 }
      );
     
    }
     return NextResponse.json(
      { message: 'patient retrieved successfully', data: patient },
      { status: 200 }
    );
    
  } catch (error) {
    console.log('get patient by id error', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
export const PUT = async (
  request: NextRequest,
  { params }: ISinglePatientParams
) => {
  try {
    const { id } = await params;
    const patient = await prisma.patient.findUnique({ where: { id: id } });
    if (!patient) {
      return NextResponse.json(
        { message: 'patient not found' },
        { status: 404 }
      );
    }
    const body = await request.json();
    const validtion = UpdatePatientSchema.safeParse(body);
    if (!validtion.success) {
      return NextResponse.json(
        { message: validtion.error.issues[0].message },
        { status: 400 }
      );
    }
    const patientUpData = await prisma.patient.update({
      where: { id: id },
      data: validtion.data,
    });
    return NextResponse.json(
      { message: 'patient updated successfully', data: patientUpData },
      { status: 200 }
    );
  } catch (error) {
    console.log('update patient error', error);
    return NextResponse.json(
      { message: 'update patient error' },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: ISinglePatientParams
) => {
  try {
    const { id } = await params;
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      return NextResponse.json(
        { message: 'patient not found' },
        { status: 404 }
      );
    }
    await prisma.patient.delete({ where: { id } });
    return NextResponse.json(
      { message: 'patient deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log('delete patient error', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
