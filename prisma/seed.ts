import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { CreateDepartmentSchema } from '../src/app/validation/validation';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const departments = [
  { name: 'العظام', description: 'تشخيص وعلاج أمراض وإصابات العظام والمفاصل' },
  { name: 'الجلدية', description: 'تشخيص وعلاج الأمراض الجلدية والتجميل' },
  { name: 'القلب', description: 'تشخيص وعلاج أمراض القلب والأوعية الدموية' },
  { name: 'الأطفال', description: 'رعاية صحة الأطفال وحديثي الولادة' },
  { name: 'النساء والتوليد', description: 'رعاية صحة المرأة والحمل والولادة' },
  { name: 'العيون', description: 'تشخيص وعلاج أمراض العيون' },
  {
    name: 'الأنف والأذن والحنجرة',
    description: 'تشخيص وعلاج أمراض الأنف والأذن والحنجرة',
  },
  { name: 'المخ والأعصاب', description: 'تشخيص وعلاج أمراض الجهاز العصبي' },
];

async function main() {
  for (const d of departments) {
    const data = CreateDepartmentSchema.parse(d);
    await prisma.department.upsert({
      where: { name:data.name},
      update: {description: data.description},
      create: data,
    });
  }
  console.log(`Seeded ${departments.length} departments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
