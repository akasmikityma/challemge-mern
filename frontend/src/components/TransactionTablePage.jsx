import React from 'react'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: '0-100', value: 10 },
    { name: '101-200', value: 20 },
    { name: '201-300', value: 15 },
    { name: '301-400', value: 25 },
    { name: '401-500', value: 50 },
    { name: '501-600', value: 30 },
    { name: '601-700', value: 35 },
    { name: '701-800', value: 80 },
    { name: '801-900', value: 40 },
    { name: '901 above', value: 20 },
  ];

const TransactionTablePage = () => {
  return ( 
    <div className=' flex flex-col min-h-screen gap-5 p-20 bg-green-100'>
        <div className='flex justify-center items-center bg-white rounded-full border p-16'>Transaction DashBoard</div>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between'>
                <button className='p-2 rounded-full bg-yellow-200'>Search Transaction</button>
                <div className=' flex gap-1 flex-row items-center'>
                    <label htmlFor="" className='p-2 bg-yellow-300 rounded-l-lg'>Select Month</label>
                    <select className='p-2 bg-yellow-100'>
                        <option >January</option>
                        <option >february</option>
                        <option >March</option>
                        <option >April</option>
                        <option >May</option>
                        <option >June</option>
                        <option >July</option>
                        <option >August</option>
                        <option >September</option>
                        <option >October</option>
                        <option >November</option>
                        <option >December</option>
                    </select>
                </div>
            </div>
            <div className='flex  justify-center w-full'>
                <table className='  w-full bg-yellow-200'>
                   <tr className='flex justify-between  border-black border-2 p-1'>
                    <th >ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Sold</th>
                    <th>Image</th>
                    </tr> 
                </table>
            </div>
            <div className='flex flex-row  justify-between'>
                <h3>Page NO -1</h3>
                <div className='flex gap-2'>
                    <button className='border p-2 rounded-full border-black'>Next</button>
                    <button className='border p-2 rounded-full border-black'>Previous</button>
                </div>
                <h3>Per Page : 10</h3>
            </div>
            {/* --------------- */}


            <div className=' flex  flex-col items-center  p-4 gap-4'>
             <h3>Statistics - June</h3>
             <table className=' w-2/3 bg-yellow-200'>
                <tbody className='border-2 border-black'>
                    <tr className='border border-black flex justify-between'>
                        <td>Total Sale</td>
                        <td>100000</td>
                    </tr>
                    <tr className='border border-black flex justify-between '>
                        <td>Total Sale</td>
                        <td>100000</td>
                    </tr>
                    <tr className='border border-black flex justify-between'>
                        <td>Total Sale</td>
                        <td>100000</td>
                    </tr>
                </tbody>
             </table>
            </div>

         {/* -----------bar chart */}
         <div className='flex justify-center flex-col items-center gap-6'>
            <h2>Bar Chart Stats - June <span style={{ fontWeight: 'normal' }}>(Selected month name from dropdown)</span></h2>
            <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00C2E9" />
            </BarChart>
        </div>

        </div>
    </div>
  )
}

export default TransactionTablePage

// //by default the Month is "March"
// <div className='w-2/3 justify-center flex flex-col border-2 border-black items-center'>
//                 <div className='flex flex-row justify-between gap-3'>
//                 <h4>Total Sale</h4>
//                 <span>100000</span>
//                 </div>
//                 <div className='flex flex-row justify-between gap-3'>
//                 <h4>Total sold Item</h4>
//                 <span>55</span>
//                 </div>
//                 <div className='flex flex-row justify-between gap-3'>
//                 <h4>Total not sold Item </h4>
//                 <span>15</span>
//                 </div>
//              </div>