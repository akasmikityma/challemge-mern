import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import TransactionTablePage from './components/TransactionTablePage'
import TransactionStatsPage from './components/TransactionStatsPage'
import TransactionBarChartPage from './components/TransactionBarChartPage'
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<TransactionTablePage/>}/>
          <Route path='/stats' element={<TransactionStatsPage/>}/>
          <Route path='/barchart' element={<TransactionBarChartPage/>}/>
        </Routes>
    </Router>
  )
}

export default App