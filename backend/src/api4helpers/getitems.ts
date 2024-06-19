//the ask is to get unique categories and the noOf itmes it has >
import { PrismaClient } from "@prisma/client";
import { myArray } from "./getset";
const client = new PrismaClient();
let resArray:{
    category:string,
    noOf:number
}[]=[]
export const getItemsEachcategory=async(month:number)=>{
  try{
        for(let i=0;i<myArray.length;i++){
            const items=await client.product.findMany({
                where:{
                    category:myArray[i]
                },
                select:{
                    title:true,
                    category:true,
                    dateOfSale:true
                }
            })
            const filteredProducts = items.filter(product => {
                const productMonth = product.dateOfSale.getMonth() + 1; // getMonth() is zero-based
                return productMonth === month;
            });
             resArray.push({category:myArray[i],noOf:filteredProducts.length});
             
        }
        console.log(resArray)
        return resArray;
  }catch(err){
    console.log(err)
  }
}
// getItemsEachcategory(1).then(prods=>console.log(`noOf Items : ${prods}`)).catch(err=>console.log(err))