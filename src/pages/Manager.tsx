import React from 'react'
import PizzaData from "../managerComp/pizzaData";
import WingData from "../managerComp/wingData";
import IceceklerData from "../managerComp/iceceklerData";
import TatlıData from "../managerComp/tatlıData";

const Manager: React.FC = () => {
  return (
    <div className='grid sm:grid-cols-1 xl:grid-cols-4   lg:grid-cols-3  text-xl font-semibold  md:grid-cols-2    justify-center gap-5 m-5 '>
      
      
        <PizzaData />
        <WingData />
        <IceceklerData />
        <TatlıData />
      
    </div>

  )
}

export default Manager
