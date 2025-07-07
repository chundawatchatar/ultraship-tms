import prisma from './index';
import { faker } from '@faker-js/faker';

async function main() {
  for (let i = 0; i < 100; i++) {
    const address = await prisma.address.create({
      data: {
        street: faker.location.street(),
        suite: faker.location.secondaryAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    });

    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase()
      },
    });

    await prisma.employee.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        website: faker.internet.domainName(),
        department: faker.commerce.department(),
        position: faker.person.jobTitle(),
        salary: faker.commerce.price({ min: 50000, max: 150000 }),
        status: faker.helpers.arrayElement(["active", "inactive"]),
        addressId: address.id,
        companyId: company.id,
      },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seeding complete.");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err);
    return prisma.$disconnect();
  });
