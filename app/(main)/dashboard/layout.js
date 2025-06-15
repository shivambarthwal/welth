import React, { Suspense } from 'react'
import Dashboardpage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
  return (
    <div>
       <h1 className="text-4xl md:text-6xl  font-extrabold tracking-tighter pr-2 pb-2 bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Dashboard
       </h1>
       <Suspense fallback={<BarLoader className="mt-4" width={"100"} height={"100"} color="#36d7b7"/>}>
        <Dashboardpage/>
       </Suspense>
     
    </div>
  )
}

export default DashboardLayout