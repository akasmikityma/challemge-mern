import { seeding_data } from "../seeding";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    sold: boolean;
    dateOfSale: Date|string;
  }
const uniqueCategoris=new Set<string>();

     export let myArray:string[]=[]
    for(let i=0;i<seeding_data.length;i++){
            uniqueCategoris.add(seeding_data[i].category);
    }
      myArray=[...uniqueCategoris];
console.log(myArray)

// puttingdata(seeding_data)
// .then(prod=>console.log(`the unique categories : ${prod}`))
// .catch(err=>console.log(err));
