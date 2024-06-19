import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

interface range {
    start: number,
    end: number | string
}

const rangeArray: range[] = [
    { start: 0, end: 100 },
    { start: 101, end: 200 },
    { start: 201, end: 300 },
    { start: 301, end: 400 },
    { start: 401, end: 500 },
    { start: 501, end: 600 },
    { start: 601, end: 700 },
    { start: 701, end: 800 },
    { start: 801, end: 900 },
    { start: 901, end: 'above' }
];

export const getProdsByRange = async (month: number) => {
    try {
        let resultArr = [];
        for (let i = 0; i < rangeArray.length; i++) {
            let allprods;

            if (rangeArray[i].end === 'above') {
                allprods = await client.product.findMany({
                    where: {
                        price: {
                            gte: rangeArray[i].start
                        }
                    }
                });
            } else {
                allprods = await client.product.findMany({
                    where: {
                        price: {
                            gte: rangeArray[i].start,
                            lte: rangeArray[i].end as number // Type assertion to ensure TypeScript knows it's a number
                        }
                    }
                });
            }

            if (allprods) {
                const filteredProducts = allprods.filter(product => {
                    const productMonth = product.dateOfSale.getMonth() + 1; // getMonth() is zero-based
                    return productMonth === month;
                });

                resultArr.push({
                    range: `${rangeArray[i].start} - ${rangeArray[i].end}`,
                    prods: filteredProducts.length
                });
            }
        }
        return resultArr;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err; // Re-throw the error after logging it
    }
};

// getProdsByRange(1)
//     .then(prods => {
//         console.log(`Products: ${JSON.stringify(prods, null, 2)}`);
//     })
//     .catch(err => {
//         console.error("Error processing products:", err);
//     });

                // const allprods = await client.product.findMany({
                //     where: {
                //         price: {
                //             gte:pricerange.start,
                //             lte:pricerange.end
                //         }
                //     }
                // });
        
                // // Sort them by the month
                // const filteredProducts = allprods.filter(product => {
                //     const productMonth = product.dateOfSale.getMonth() + 1; // getMonth() is zero-based
                //     return productMonth === month;
                // });
                // return filteredProducts;