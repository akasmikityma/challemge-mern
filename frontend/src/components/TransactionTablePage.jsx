import React from 'react'

const TransactionTablePage = () => {
  return ( 
    <div className=' flex flex-col h-screen gap-5 p-20 bg-green-100'>
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
        </div>
    </div>
  )
}

export default TransactionTablePage