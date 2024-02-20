import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loadings: React.FC = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <BounceLoader color="#36d7b7" size={30} />
    </div>
  );
};

export default Loadings;
