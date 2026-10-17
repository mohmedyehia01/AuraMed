import {NextRequest, NextResponse} from 'next/server';
import { CreatePatientSchema } from '@/app/validation/validation';
import { prisma } from '@/lib/prisma';

export const POST = async (request: NextRequest)=>{
 try{
   const body =(await request.json());
  const validation = CreatePatientSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json({message:validation.error.issues[0].message},{status:400})

  const newpatient  =await prisma.patient.create({data:validation.data,
    

  });
  
return NextResponse.json({message:'Patient created successfully',data:newpatient},{status:201})

 }catch (error){
  console.log("create patient error",error);
  return NextResponse.json({message:"Internal server error"},{status:500},)
}
};