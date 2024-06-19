
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function getNotSoldProductsByMonth(month: number, year: number) {
//   try {
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 1);

//     const notSoldProducts = await prisma.product.findMany({
//       where: {
//         sold: false,
//         dateOfSale: {
//           gte: startDate,
//           lt: endDate
//         }
//       },
//       select: {
//         title: true,
//         price: true,
//         sold: true,
//         dateOfSale: true
//       }
//     });

//     return notSoldProducts;
//   } catch (error) {
//     console.error('Error fetching not sold products:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Example usage
// getNotSoldProductsByMonth(1, 2022).then(products => {
//   console.log('Not sold products in January:', products);
// }).catch(error => {
//   console.error('Error:', error);
// });
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getNotSoldProductsByMonth(month: number) {
  try {
    // Fetch all not sold products
    const allNotSoldProducts = await prisma.product.findMany({
      where: {
        sold: false,
      },
      select: {
        title: true,
        price: true,
        sold: true,
        dateOfSale: true,
      }
    });

    // Filter products by the specified month
    const filteredProducts = allNotSoldProducts.filter(product => {
      const productMonth = product.dateOfSale.getMonth() + 1; // getMonth() is zero-based
      return productMonth === month;
    });

    return filteredProducts.length;
  } catch (error) {
    console.error('Error fetching not sold products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
// getNotSoldProductsByMonth(1).then(products => {
//   console.log('Not sold products in January:', products);
// }).catch(error => {
//   console.error('Error:', error);
// });
