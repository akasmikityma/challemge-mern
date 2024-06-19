import { seeding_data } from "./seeding";
import { PrismaClient } from "@prisma/client";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: Date;
}

const client = new PrismaClient();

// Convert dateOfSale from string to Date
const convertSeedingData = (data: typeof seeding_data): Product[] => {
  return data.map(item => ({
    ...item,
    dateOfSale: new Date(item.dateOfSale),
  }));
};

const seedingMethod = async (seeding_data: Product[]) => {
  for (let i = 0; i < seeding_data.length; i++) {
    // Each object is processed one by one and awaited to be pushed
    const new_product = await client.product.create({
      data: {
        title: seeding_data[i].title,
        price: seeding_data[i].price,
        description: seeding_data[i].description,
        category: seeding_data[i].category,
        image: seeding_data[i].image,
        sold: seeding_data[i].sold,
        dateOfSale: seeding_data[i].dateOfSale
      }
    });
    console.log(new_product.title);
  }
}

// Convert the seeding data and call the seeding method
const convertedSeedingData = convertSeedingData(seeding_data);

seedingMethod(convertedSeedingData)
  .then(() => {
    console.log('Seeding completed');
    client.$disconnect();  // Disconnect the Prisma Client after seeding
  })
  .catch((error) => {
    console.error('Seeding error:', error);
    client.$disconnect();  // Disconnect the Prisma Client in case of an error
  });
