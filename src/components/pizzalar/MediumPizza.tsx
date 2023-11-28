import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";

interface IDataItem {
  _id: string;
  tür: string;
  fiyatlar: {
    büyük: number;
    orta: number;
    küçük: number;
  };
  url: string;
}

const Pizza: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);

  useEffect(() => {
    
    axios.get<IDataItem[]>('http://localhost:3001/pizza')
      .then((response: AxiosResponse<IDataItem[]>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>

    <ul className='grid   sm:grid-cols-2 mx-5   md:grid-cols-4 justify-center gap-5'>
        {data.map((item) => (
            <div className='border   hover:scale-110 duration-300     '>

                <div className=' h-64 items-center flex justify-center p-2 my-2'>
                    <li className=' text-center' key={item._id}>
                        <strong>{item.tür}</strong>
                        <ul>

                            <li>Large: {item.fiyatlar.büyük}</li>
                            <li><img src={item.url} alt={item.tür} className='w-40' /></li>
                        </ul>
                    </li>
                    


                </div>
                <div className='border p-1 px-3  flex justify-center hover:bg-red-400 bg-red-600 text-white'>
                        <Link to="/sepet" >Sipariş Ver</Link>
                </div>


            </div>



        ))}
    </ul>
</div>
  );
};

export default Pizza;
