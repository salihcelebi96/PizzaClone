import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

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
      
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <strong>{item.tür}</strong>
            <ul>
              
              <li>Small: {item.fiyatlar.küçük}</li>
              <li><img src={item.url} alt={item.tür} style={{ maxWidth: '100%', height: 'auto' }} /></li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pizza;
