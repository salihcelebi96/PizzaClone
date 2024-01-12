import React from 'react'
import PizzaData from "../managerComp/pizzaData";
import WingData from "../managerComp/wingData";
import IceceklerData from "../managerComp/iceceklerData";
import TatlıData from "../managerComp/tatlıData";

const Manager :React.FC = () => {
  return (
    <div>
        <div className='text-center  mt-2 text-2xl text-red-600 font-semibold'>
            <h1>Management Page</h1>
        </div>
        <div className='h-screen grid lg:grid-cols-4 sm:grid-cols-1  m-7 gap-5'>
       <PizzaData/>
       {/* <WingData/>
       <IceceklerData/>
       <TatlıData/> */}
    </div>
    </div>
    
  )
}

export default Manager
