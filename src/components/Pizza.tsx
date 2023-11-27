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
}

const Pizza: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);

  useEffect(() => {
    // Verileri çekmek için API'ye istek yap
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
      <h1>Pizza Menu</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <strong>{item.tür}</strong>
            <ul>
              <li>Large: {item.fiyatlar.büyük}</li>
              <li>Medium: {item.fiyatlar.orta}</li>
              <li>Small: {item.fiyatlar.küçük}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pizza;
