import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'comunitario' },
    { name: 'social' },
    { name: 'ocio y tiempo libre' },
    { name: 'protección civil' },
    { name: 'socio-sanitario' },
    { name: 'educativo' },
    { name: 'deportivo' },
    { name: 'internacional' },
    { name: 'cultural' },
    { name: 'medio ambiente' },
    { name: 'otros' },
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
