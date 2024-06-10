import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Comunitario' },
    { name: 'Social' },
    { name: 'Ocio y tiempo libre' },
    { name: 'Protección civil' },
    { name: 'Socio-sanitario' },
    { name: 'Educativo' },
    { name: 'Deportivo' },
    { name: 'Internacional' },
    { name: 'Cultural' },
    { name: 'Medio ambiente' },
    { name: 'Otros' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
