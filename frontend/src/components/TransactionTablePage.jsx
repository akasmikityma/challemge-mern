import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//     { name: '0-100', value: 10 },
//     { name: '101-200', value: 20 },
//     { name: '201-300', value: 15 },
//     { name: '301-400', value: 25 },
//     { name: '401-500', value: 50 },
//     { name: '501-600', value: 30 },
//     { name: '601-700', value: 35 },
//     { name: '701-800', value: 80 },
//     { name: '801-900', value: 40 },
//     { name: '901 above', value: 20 },
//   ];

const TransactionTablePage = () => {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('3');  // Default month is March
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [monthStats,setMonthStats]=useState({})
    const [data,setdata]=useState([])
    useEffect(() => {
        fetchTransactions();
        getStats()
        getBarData()
    }, [search, month, page]);

    const getStats=async()=>{
        try {
            console.log("This is getStats");
            const response = await axios.get(`http://localhost:3000/api/getStats?month=${month}`);
            console.log(response.data);
            await setMonthStats(response.data)
          } catch (err) {
            console.error("Error in getStats:", err);
          }
    }
    
    const getBarData=async()=>{
        try{
            const response =await axios.get(`http://localhost:3000/api/barData?month=${month}`)
            console.log(response.data.bardata);
            setdata(response.data.bardata)
        }catch(err){
            console.error(`something fucked up`)
        }
    }

    const fetchTransactions=async()=>{
        try {
            const params = new URLSearchParams({ 
                search, 
                page: page.toString(), 
                perPage: perPage.toString(), 
                month 
            });
    
            const response = await axios.get(`http://localhost:3000/api/getAll?${params.toString()}`);
            setTransactions(response.data.data);
            setTotal(response.data.pagination.total);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }
 
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleMonthChange = (e) => setMonth(e.target.value);
    const handleNextPage = () => setPage(page + 1);
    const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);
 


  return ( 
    <div className=' flex flex-col min-h-screen gap-5 p-20 bg-green-100'>
        <div className='flex justify-center items-center bg-white rounded-full border p-16'>Transaction DashBoard</div>
        <div className='flex flex-col gap-6'>
            <div className='flex justify-between'>
                {/* <button className='p-2 rounded-full bg-yellow-200' onClick={fetchTransactions}>Search Transaction</button> */}
                <input type="text" placeholder='Search Transaction' className='px-6 rounded-full bg-yellow-200' onChange={handleSearchChange}/>
                <div className=' flex gap-1 flex-row items-center'>
                    <label htmlFor="" className='p-2 bg-yellow-300 rounded-l-lg'>Select Month</label>
                    <select className='p-2 bg-yellow-100' value={month} onChange={handleMonthChange}>
                        <option value="1">January</option>
                        <option value="2">february</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <div className='flex justify-center w-full'>
                    <table className='w-full bg-yellow-200 border-collapse'>
                        <thead>
                            <tr className='border-black border-2'>
                                <th className='border-black border-2 p-2'>ID</th>
                                <th className='border-black border-2 p-2'>Title</th>
                                <th className='border-black border-2 p-2'>Description</th>
                                <th className='border-black border-2 p-2'>Price</th>
                                <th className='border-black border-2 p-2'>Category</th>
                                <th className='border-black border-2 p-2'>Sold</th>
                                <th className='border-black border-2 p-2'>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} className='border-black border-2'>
                                    <td className='border-black border-2 p-2'>{transaction.id}</td>
                                    <td className='border-black border-2 p-2'>{transaction.title.length > 10 ? `${transaction.title.slice(0, 20)}...` : transaction.title}</td>
                                    <td className='border-black border-2 p-2'>{transaction.description.length > 10 ? `${transaction.description.slice(0,80)}...` : transaction.description}</td>
                                    <td className='border-black border-2 p-2'>{transaction.price}</td>
                                    <td className='border-black border-2 p-2'>{transaction.category}</td>
                                    <td className='border-black border-2 p-2'>{transaction.sold ? "Yes" : "No"}</td>
                                    <td className='border-black border-2 p-2'><img src={transaction.image} alt={transaction.title} className='w-16 h-16'/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            <div className='flex flex-row  justify-between'>
                <h3>Page NO - {page}</h3>
                <div className='flex gap-2'>
                <button className='border p-2 rounded-full border-black'onClick={handlePreviousPage}>Previous</button>
                <button className='border p-2 rounded-full border-black' onClick={handleNextPage}>Next</button>   
                </div>
                <h3>Per Page : {perPage}</h3>
            </div>
            {/* --------------- */}


            <div className=' flex  flex-col items-center  p-4 gap-4'>
             <h3>Statistics - June</h3>
             <table className=' w-2/3 bg-yellow-200'>
                <tbody className='border-2 border-black'>
                    <tr className='border border-black flex justify-between'>
                        <td>Total Sale</td>
                        <td>{monthStats.total_sale}</td>
                    </tr>
                    <tr className='border border-black flex justify-between '>
                        <td>Total Sold Items</td>
                        <td>{monthStats.noOfSoldProds}</td>
                    </tr>
                    <tr className='border border-black flex justify-between'>
                        <td>Total not Sold Items</td>
                        <td>{monthStats.noOfNotSoldProds}</td>
                    </tr>
                </tbody>
             </table>
            </div>

         {/* -----------bar chart */}
         <div className='flex justify-center flex-col items-center gap-6 mt-6'>
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
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="prods" fill="#00C2E9" />
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