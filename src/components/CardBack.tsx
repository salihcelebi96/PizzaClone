import React from 'react'

interface CardBackProps {
    bgColor: () => React.CSSProperties;
    cvc:string;
  }

const CardBack : React.FC<CardBackProps> = ({ bgColor,cvc }) => {

    console.log('Computed Styles:', bgColor());
  return (
    <div>
      <div style={bgColor()} className='relative credit-card flex flex-col gap-4  bg-gray-300 border w-[300px] rounded-2xl h-40 mt-6'>
          <div className='h-10 bg-black mt-2 border-none rounded-lg'>
            
         </div>
         <div className='w-full flex justify-center '>
            <div className='bg-gray-400 h-8 w-2/3 flex justify-end  '>
                <p> {cvc} </p>
            </div>
              





         </div>
          
          
          
        </div>
    </div>
  )
}

export default CardBack;
