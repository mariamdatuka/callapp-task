import Table from './components/Table'
import PieChart from './components/PieChart'
import { Route, Routes } from "react-router-dom";



function App() {


  return (
    <>
   <Routes>
    <Route path="/" element={<Table />} />
    <Route path="/piechart" element={<PieChart />} />
   </Routes>
    </>
  )
}

export default App
