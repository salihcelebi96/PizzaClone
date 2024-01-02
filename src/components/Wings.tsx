import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { pushNewItems} from "../reducers/sepetSlice";
interface IDataItem {
  _id: string;
  tür: string;
  soslar: string[];
  adetler: {
    '6 Adet': number;
    '12 Adet': number;
    '24 Adet': number;
  };
}

const Wing: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);

  useEffect(() => {
    // Verileri çekmek için API'ye istek yap
    axios.get<IDataItem[]>('http://localhost:3002/wings')
      .then((response: AxiosResponse<IDataItem[]>) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Wings Menu</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <strong>{item.tür}</strong>
            <ul>
              <li>6 Adet: {item.adetler['6 Adet']}</li>
              <li>12 Adet: {item.adetler['12 Adet']}</li>
              <li>24 Adet: {item.adetler['24 Adet']}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wing;
