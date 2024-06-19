import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

interface TotalAmountResult {
  sum: number;
  noOfSoldThisMonth: number;
}

export const getTotalAmount = async (month: number): Promise<TotalAmountResult | null> => {
  try {
    // Fetch all sold products
    const allSoldProducts = await client.product.findMany({
      where: {
        sold: true,
      },
      select: {
        price: true,
        dateOfSale: true,
      },
    });

    // Filter products by the specified month
    const filteredProducts = allSoldProducts.filter(product => {
      const productMonth = product.dateOfSale.getMonth() + 1; // getMonth() is zero-based
      return productMonth === month;
    });

    const noOfSoldThisMonth = filteredProducts.length;

    // Calculate the sum of prices
    const sum = filteredProducts.reduce((total, product) => total + product.price, 0);

    return { sum, noOfSoldThisMonth };
  } catch (err) {
    console.error('Error fetching the total amount:', err);
    return null;
  } finally {
    await client.$disconnect();
  }
}


// getTotalAmount(1)
//   .then(result => {
//     if (result) {
//       console.log(`Total amount sold in January: ${result.sum}`);
//       console.log(`Number of products sold in January: ${result.noOfSoldThisMonth}`);
//     }
//   })
//   .catch(err => console.error('Error:', err));
